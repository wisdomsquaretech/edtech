<?php

namespace App\Filament\Resources\LessonResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLessonRequest extends FormRequest
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
			'curriculum_id' => 'required',
			'title' => 'required|string',
			'level' => 'required|string',
			'description' => 'required|string',
			'file_type' => 'required|string',
			'file_path' => 'required|string',
			'language_code' => 'required|string'
		];
    }
}
