<script>
  import { onMount } from 'svelte';
  import { Alert, Badge, Indicator } from 'flowbite-svelte';
  import { invoke } from '@tauri-apps/api/tauri';
import { P, GradientButton } from 'flowbite-svelte';
  let endpoints = false;
  let available='Unavailable';
  let color = 'red';
  async function test_endpoints(){
    endpoints = invoke('test_endpoints', { });
    if(endpoints){
      color = 'green';
      available = 'Available';

    }
    else{
      color = 'red';
      available = 'Unavailable';
    }
  }
</script>
<html class="dark" lang="en">
<body width="100vw" height="100vh">
<div class="p-8">
  <Alert>
    <span class="font-medium">Info alert!</span>
    Change a few things up and try submitting again. Hi my name is muund
  </Alert>
</div>
    <div on:load="{test_endpoints}" style="padding-left:5%;">
      <P size="base">IPFS facilities are: </P> <Badge color="{color}" rounded class="px-2.5 py-0.5">
        <Indicator color="{color}" size="xs" class="me-1" />{available}
      </Badge>
    </div>
    <div style="padding-left: 5%;">
      <GradientButton on:click="{test_endpoints}">Re-Test</GradientButton>
    </div>
    </body>
  </html>
