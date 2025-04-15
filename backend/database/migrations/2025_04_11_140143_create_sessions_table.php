<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained();
            $table->foreignId('tutor_id')->constrained('users');
            $table->foreignId('student_id')->constrained('users');
            $table->foreignId('lesson_id')->constrained();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('meeting_link');
            $table->text('notes')->nullable();
            $table->enum('platform', ["zoom","jitsi"]);
            $table->boolean('checklist_done')->default(false);
            $table->enum('status', ["scheduled","postponed","completed","cancelled"]);
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
