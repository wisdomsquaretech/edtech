<?php

namespace App\Filament\Resources\LessonResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateLessonRequest extends FormRequest
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
			'curriculum_id' => 'required|exists:curricula,id',
			'title' => 'required|string',
			'level' => 'required|string|in:scheduled,postponed,completed,cancelled',
			'description' => 'required|string',
			'file_type' => 'required|string|in:pdf,video,ppt',
			'file_path' => 'required|string',
			'language_code' => 'required|string'
		];
    }
}
