<?php

namespace App\Filament\Resources\LessonResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

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
			'level' => 'required|string|in:beginner,intermediate,advanced',
			'description' => 'required|string',			
            'lesson_files'               => ['required','array','min:1','max:3'],
            'lesson_files.*'   => [
                'required',
                File::types(['pdf', 'ppt', 'pptx'])->max(10 * 1024), // Max 10MB per file
            ],
			'language_code' => 'required|string'
		];
    }
    public function messages(): array
    {        
        return [
            'lesson_files.required'     => 'You must supply at least one file (max 3).',
            'lesson_files.*.required'   => 'Each file is required.',
            'lesson_files.*.file'       => 'Each lesson file must be a valid file.',
            'lesson_files.*.mimes'      => 'Only PDF, PPT, or PPTX files are allowed.',
            'lesson_files.*.max'        => 'Each file must not be greater than 10MB.',
        ];
    }
}
