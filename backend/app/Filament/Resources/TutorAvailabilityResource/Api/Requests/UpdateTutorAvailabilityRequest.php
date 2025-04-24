<?php

namespace App\Filament\Resources\TutorAvailabilityResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTutorAvailabilityRequest extends FormRequest
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
            'tutor_id' => 'required',
            'day_of_week' => ['required', 'string', function ($attribute, $value, $fail) {
                $validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                $days = array_map('trim', explode(',', strtolower($value)));

                foreach ($days as $day) {
                    if (!in_array($day, $validDays)) {
                        return $fail("Invalid day of week: $day");
                    }
                }
            }],
            'start_time' => ['required', 'date_format:H:i:s'],
            'end_time' => ['required', 'date_format:H:i:s', function ($attribute, $value, $fail) {
                $startTime = request()->input('start_time');
                if ($startTime && strtotime($startTime) >= strtotime($value)) {
                    $fail('The end time must be after the start time.');
                }
            }],
        ];
    }
}
