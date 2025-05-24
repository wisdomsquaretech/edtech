<?php 
use App\Models\School;
use App\Models\TutorAvailability;
use App\Models\TutorAvailabilitySlot;
use App\Models\User;

beforeEach(function(){
    $this->tutor = User::factory()->create()->assignRole('tutor');    
});

test('tutor can index schools', function () {
    School::factory()->count(3)->create();
    // exercise
    $this
        ->actingAs($this->tutor, 'sanctum')
        ->getJson('/api/schools')
        // verify
        ->assertStatus(200);
        //->assertJsonCount(3, 'data');
});

test('tutor can show a school', function () {
    $school = School::factory()->create();

    $response = $this
        ->actingAs($this->tutor, 'sanctum')
        ->getJson("/api/schools/{$school->id}")
        ->assertStatus(200)
        ->assertJsonPath('data.id', $school->id);
});

test('tutor can store a school', function () {
    $payload = School::factory()->make()->toArray();

    $this
        ->actingAs($this->tutor, 'sanctum')
        ->postJson('/api/schools', $payload)
        ->assertStatus(200)
        ->assertJsonStructure(['data' => ['id','name','email','address']]);

    $this->assertDatabaseHas('schools', ['name' => $payload['name']]);
});

test('tutor can update a availability slot', function () {
    
    $tutorAvailabilitySlot = TutorAvailabilitySlot::factory()->create();
    $new = [
        "tutor_id" => $tutorAvailabilitySlot->tutor_id,
        "slot_date" => $tutorAvailabilitySlot->slot_date->format('d-m-Y'),
        "start_time" =>  $tutorAvailabilitySlot->start_time,
        'end_time' => $tutorAvailabilitySlot->end_time,
        'capacity' => '10',
        'is_booked' => true
    ];

    $this
        ->actingAs($this->tutor, 'sanctum')
        ->putJson("/api/tutor-availability-slots/{$tutorAvailabilitySlot->id}", $new)
        ->assertStatus(200)
        ->assertJsonPath('data.capacity','10');
});