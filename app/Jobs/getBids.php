<?php

namespace App\Jobs;

use App\Jobs\Job;
use App\Models\Bids;
use App\Models\Mongo\MongoBids;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class getBids extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $bids = MongoBids::where('product_id', $this->id)->get();
        foreach ($bids as $key=>$value) {
            Bids::create([
                'product_id' => $this->id,
                'name' => $value->name,
                'type' => $value->type,
                'price' => $value->price,
                'date' => $value->date,
            ]);
        }
    }
}
