<?php


namespace App\Http\Controllers;


use App\Models\CodeMaster;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login()
    {
        if (Auth::check()) {
            $user = Auth::user();
            if (!$user) {
                return view('auth.login');
            } else {
                return redirect()->route('welcome');
            }
        } else {
            return view('auth.login');
        }
    }

    public function loginPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'loginId' => 'required|max:50',
            'password' => 'required|min:6|max:16',
        ]);

        if ($validator->fails()) {
            return back()->withInput()->with('error', $validator->errors()->first());
        }
        try {
            $credentials = [
                'LOGIN_ID' => $request->loginId,
                'password' => $request->password,
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'USER_LVL' => function ($query) {
                    $query->whereIn('USER_LVL', [
                        config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
                        config('constants.DETAIL_CODES.USER_LVL.STAFF'),
                        config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
                        config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
                    ]);
                }
            ];

            if (Auth::attempt($credentials)) {
                return redirect()->route('welcome');
            }
            return redirect()->route('login');
        } catch (\Exception $exception) {
            Log::notice("Signup  false" . ' ' . Carbon::now() . ': ' . $exception->getMessage());
            return back()->withInput()->with('error', "Signup failed");
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }

    public function getInfo() {
        $user = auth()->user();
        $data = null;
        if ($user) {
            $data['USER_LVL'] = $user->USER_LVL;
        }
        return response()->json([
            'code' => 200,
            'data' => $data
        ]);
    }

    public function saveToken(Request $request)
    {
        auth()->user()->update(['device_token' => $request->token]);
        return response()->json(['token saved successfully.']);
    }

    public function sendNotification(Request $request)
    {
        $firebaseToken = User::whereNotNull('device_token')->pluck('device_token')->all();

        $SERVER_API_KEY = env('FIREBASE_KEY');

        $data = [
            "registration_ids" => $firebaseToken,
            "notification" => [
                "title" => 'Test notification',
                "body" => 'Test notification body',
                "content_available" => true,
                "priority" => "high",
                "clickAction" => "https://stackoverflow.com/"
            ],
            "webpush" => [
                "fcm_options" => [
                    "link" => '/worldrock'
                ]
            ]
        ];
        $dataString = json_encode($data);

        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);

        $response = curl_exec($ch);

//        dd($response);
        return response()->json(['Send notification successfully.']);
    }
}
