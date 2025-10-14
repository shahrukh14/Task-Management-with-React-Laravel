<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
   
    public function register(Request $request){
        try {
            // Validation
            $validatedData = $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|string|email|max:255|unique:users,email',
                'mobile'   => 'required|string|max:15',
                'password' => 'required|string|min:6|confirmed',
            ]);

            // Create user
            $user = User::create([
                'name'     => $validatedData['name'],
                'email'    => $validatedData['email'],
                'mobile'   => $validatedData['mobile'],
                'password' => Hash::make($validatedData['password']),
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'User registered successfully!',
                'data'    => $user
            ], 201);

        } catch (ValidationException $e) {
            // validation error handling
            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // error handling
            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
