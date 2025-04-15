<?php

namespace App\Filament\Resources\TutorStudentSessionLookupResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTutorStudentSessionLookupRequest extends FormRequest
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
			'session_id' => 'required',
			'user_id' => 'required',
			'completed' => 'required|integer',
			'incomplete' => 'required|integer',
			'absent' => 'required|integer'
		];
    }
}
