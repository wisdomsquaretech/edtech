<?php

namespace App\Filament\Resources\TutorStudentSessionLookupResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTutorStudentSessionLookupRequest extends FormRequest
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
            'completed' => 'required|integer|min:0',
            'incomplete' => 'required|integer|min:0',
            'absent' => 'required|integer|min:0'
        ];
    }
}
