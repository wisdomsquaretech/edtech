<?php
/*
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DefaultRolePermission extends Model
{
    protected $table = 'default_role_permissions';
    public $timestamps = false;

    protected $fillable = [
        'role_name',
        'permission_name',
    ];
}
*/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DefaultRolePermission extends Model
{
    use SoftDeletes;
    protected $table = 'default_role_permissions';
    protected $primaryKey = 'id'; // Replace with your custom primary key

    protected $fillable = [
        'role_id',
        'permission_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'role_id' => 'integer',
        'permission_id' => 'integer'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Define the relationship with the Permission model
    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }
}
