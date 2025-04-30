<?php

namespace App\Filament\Resources\SessionResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSessionRequest extends FormRequest
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
            'school_id' => 'required|exists:schools,id',
            'tutor_id' => 'required|exists:users,id',
            'student_id' => 'required|exists:users,id',
            'lesson_id' => 'required|exists:lessons,id',
            'start_time' => 'required|date_format:d-m-Y H:i:s',
            'end_time' => ['required', 'date_format:d-m-Y H:i:s', function ($attribute, $value, $fail) {
                $startTime = request()->input('start_time');
                if ($startTime && strtotime($startTime) >= strtotime($value)) {
                    $fail('The end time must be after the start time.');
                }
            }],
            'meeting_link' => 'required|url',
            'notes' => 'sometimes|string|min:5|max:255',
            'platform' => 'required|string|in:zoom,jitsi',
            'checklist_done' => 'required|boolean',
            'status' => 'required|string|in:scheduled,postponed,completed,cancelled'
        ];
    }
}
