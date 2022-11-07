<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request) {
        if (auth()->check()) {
            return view('welcome');
        } else {
            if ($request->create_as || $request->register) {
                return view('welcome');
            } else {
                return redirect()->route('login');
            }
        }
    }
}
