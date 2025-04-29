<?php

namespace App\Filament\Resources\NotificationResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotificationRequest extends FormRequest
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
            'title' => 'required|string|min:5|max:255',
            'message' => 'required|string|min:10|max:500',
            'status' => 'required|string|in:pending,viewed',
            'creator_id' => 'required|exists:users,id'
        ];
    }
}
