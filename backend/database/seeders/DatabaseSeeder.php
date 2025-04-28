<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Language;
use App\Models\School;
use App\Models\Curriculum;
use App\Models\Lesson;
use App\Models\Session;
use App\Models\SessionFeedback;
use App\Models\Booking;
use App\Models\SessionAttendance;
use App\Models\TutorAvailability;
use App\Models\TutorAvailabilitySlot;
use App\Models\Notification;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class
        ]);
        // Create 5 coordinators
        $coordinators = User::factory()
            ->count(5)
            ->create()
            ->each(function (User $user) {
                $user->syncRoles(['coordinator']);
            });

        // Create 10 schools and assign coordinators
        $schools = School::factory()
            ->count(10)
            ->create()
            ->each(function (School $school) use ($coordinators) {
                $coordinator = $coordinators->random();
                $school->coordinator_id = $coordinator->id;
                $school->save();
                $school->users()->attach($coordinator->id);
            });

        // Create 15 tutors
        $tutors = User::factory()
            ->count(15)
            ->create()
            ->each(function (User $user) {
                $user->syncRoles(['tutor']);
            });

        // Add tutor availability
        $tutors->each(function (User $tutor) {
            TutorAvailability::factory()
                ->count(3)
                ->for($tutor, 'tutor')
                ->create();

            TutorAvailabilitySlot::factory()
                ->count(5)
                ->for($tutor, 'tutor')
                ->create();
        });

        // Create 40 students
        $students = User::factory()
            ->count(40)
            ->create()
            ->each(function (User $user) {
                $user->syncRoles(['student']);
            });

        // Assign students to random schools
        $students->each(function (User $student) use ($schools) {
            $school = $schools->random();
            $school->users()->attach($student->id);
        });

        // Create 20 curricula
        $curricula = Curriculum::factory()
            ->count(20)
            ->create()
            ->each(function (Curriculum $curriculum) use ($tutors) {
                $curriculum->creator_id = $tutors->random()->id;
                $curriculum->save();
            });

        // Add lessons to curricula
        $curricula->each(function (Curriculum $curriculum) {
            Lesson::factory()
                ->count(3)
                ->for($curriculum)
                ->create();
        });

        // Create 30 sessions
        $sessions = Session::factory()
            ->count(30)
            ->create()
            ->each(function (Session $session) use ($tutors, $students, $schools) {
                $session->tutor_id = $tutors->random()->id;
                $session->student_id = $students->random()->id;
                $session->school_id = $schools->random()->id;
                $session->lesson_id = Lesson::inRandomOrder()->first()->id;
                $session->save();
            });

        // Add feedback, attendance, and booking for sessions
        $sessions->each(function (Session $session) {
            SessionFeedback::factory()
                ->for($session)
                ->for($session->student)
                ->create();

            SessionAttendance::factory()
                ->for($session)
                ->for($session->student)
                ->create();

            Booking::factory()
                ->for($session)
                ->for($session->student, 'student')
                ->for($session->tutor, 'creator')
                ->for(TutorAvailabilitySlot::inRandomOrder()->first(), 'slot')
                ->create();
        });

        // Notifications
        Notification::factory()
            ->count(20)
            ->create();

        // Add languages to 30 random users
        User::inRandomOrder()
            ->take(30)
            ->each(function (User $user) {
                Language::factory()
                    ->count(1)
                    ->for($user)
                    ->create();
            });
    }
}
