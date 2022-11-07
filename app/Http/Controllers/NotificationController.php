<?php


namespace App\Http\Controllers;


use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class NotificationController extends Controller
{
    public function htmlIndex() {
        return view('notifications.index');
    }
    public function index() {
        $notifications = Notification::where('user_id', auth()->id())->orderBy('created_at', 'DESC')->orderBy('is_read', 'DESC')->get();
        return response()->json([
            'code' => 200,
            'data' => $notifications
        ]);
    }

    public function htmlCreate() {
        return view('notifications.create');
    }
    public function create() {

    }
    public function store(Request $request) {
        try {

            $data = [
                'title' => $request->title,
                'description' => $request->description,
                'created_by' => auth()->id(),
            ];
            DB::beginTransaction();
            //handle upload files if any
            if ($request->files) {
                foreach ($request->files as $files) {
                    $folderUploads = public_path  ('/uploads/file_notifications/');
                    if (!File::isDirectory($folderUploads)) {
                        File::makeDirectory($folderUploads, 0777, true, true);
                    }
                    $file_path_arr = array();
                    foreach ($files as $file) {
                        $file_name = $file->getClientOriginalName();
                        $file->move('uploads/file_notifications/', time() . '_' . $file_name);
                        $file_path = '/uploads/file_notifications/' . time() . '_' . $file_name;
                        array_push($file_path_arr, $file_path);
                    }
                    $data['files'] = json_encode($file_path_arr);
                }
            }

            foreach ($request->user_ids as $user_id) {
                $data['user_id'] = $user_id;
                Notification::create($data);
            }
            DB::commit();
            return response()->json([
                'code' => 200,
                'message' => 'Push notification success.'
            ]);
        } catch (\Exception $e) {
            Log::notice("Push notification false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return response()->json([
                'code' => 500,
                'message' => 'Push notification failed.'
            ]);
        }

    }

}
