<?php

namespace App\Filament\Resources\SessionAttendanceResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSessionAttendanceRequest extends FormRequest
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
            'joined_at' => 'required|date_format:d-m-Y H:i:s',
            'left_at' => ['required', 'date_format:d-m-Y H:i:s', function ($attribute, $value, $fail) {
                $startTime = request()->input('joined_at');
                if ($startTime && strtotime($startTime) >= strtotime($value)) {
                    $fail('The left time must be after the joined time.');
                }
            }],
        ];
    }
}
