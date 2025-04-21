<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Get a list of all tables
        $tables = DB::connection()->getDoctrineSchemaManager()->listTableNames();

        foreach ($tables as $table) {
            // Skip tables that don't need modification
            if (!Schema::hasColumn($table, 'deleted_at')) {
                // Apply the softDeletes column to this table

                $table = str_replace('"', "", $table);

                Schema::table($table, function (Blueprint $tableBlueprint) use ($table) {
                    $tableBlueprint->softDeletes();
                });
            }
        }
    }

    public function down(): void
    {
        // Get a list of all tables
        $tables = DB::connection()->getDoctrineSchemaManager()->listTableNames();

        foreach ($tables as $table) {
            // Skip tables that don't need modification
            if (Schema::hasColumn($table, 'deleted_at')) {
                // Remove the softDeletes column from this table
                $table = str_replace('"', "", $table);
                Schema::table($table, function (Blueprint $tableBlueprint) use ($table) {
                    $tableBlueprint->dropSoftDeletes();
                });
            }
        }
    }
};
