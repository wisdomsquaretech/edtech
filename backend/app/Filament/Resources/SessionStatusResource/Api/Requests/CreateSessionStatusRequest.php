<?php

namespace App\Filament\Resources\SessionStatusResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSessionStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'session_id' => 'required|exists:sessions,id',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|string|in:completed,incomplete,absent'
        ];
    }
}
