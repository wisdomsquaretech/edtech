<?php

namespace App\Filament\Resources\SessionResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSessionRequest extends FormRequest
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
			'school_id' => 'required',
			'tutor_id' => 'required',
			'student_id' => 'required',
			'lesson_id' => 'required',
			'start_time' => 'required',
			'end_time' => 'required',
			'meeting_link' => 'required|string',
			'notes' => 'required|string',
			'platform' => 'required|string',
			'checklist_done' => 'required',
			'status' => 'required|string'
		];
    }
}
