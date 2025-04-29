<?php

namespace App\Filament\Resources\SessionFeedbackResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSessionFeedbackRequest extends FormRequest
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
            'rating' => 'required|integer|min:0',
            'comments' => 'sometimes|string|min:5|max:255',
            'submitted_at' => 'required|date_format:d-m-Y H:i:s'
        ];
    }
}
