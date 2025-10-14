<?php

namespace App\Http\Controllers\Task;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{   
    public function get(Request $request){
        $user = $request->user();
        $tasks = Task::where('user_id', $user->id)->orderBy('id', 'DESC')->paginate(4);
        return response()->json([
            'status'  => true,
            'data'    => $tasks->items(),
            'meta'    => [
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'per_page' => $tasks->perPage(),
                'total' => $tasks->total(),
            ]
        ], 200);
    }

    public function create(Request $request){
        try {
            // Validation
            $validatedData = $request->validate([
                'title'       => 'required|string|max:255',
                'description' => 'nullable|string',
                'due_date'    => 'nullable|date',
            ]);
            $user = $request->user();
            $validatedData['user_id'] = $user->id;
            $validatedData['status'] = "Pending";
            // Create Task
            $task = Task::create($validatedData);

            return response()->json([
                'status'  => true,
                'message' => 'Task created successfully!',
                'data'    => $task
            ], 201);

        } catch (ValidationException $e) {
            // Validation error
            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Exception error
            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);

            // Validation
            $validatedData = $request->validate([
                'title'       => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'status'      => 'sometimes|required|in:Pending,In Progress,Completed',
                'due_date'    => 'nullable|date',
            ]);

            // Update Task
            $task->update($validatedData);

            return response()->json([
                'status'  => true,
                'message' => 'Task updated successfully!',
                'data'    => $task
            ], 200);

        } catch (ValidationException $e) { //Validation error handling
            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) { //Exception Handling
            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function delete($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();

            return response()->json([
                'status'  => true,
                'message' => 'Task deleted successfully!',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


}
