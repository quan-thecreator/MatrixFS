<script>
  import { onMount } from 'svelte';
  import { Alert, Badge, Indicator } from 'flowbite-svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  import { P, GradientButton, Toast } from 'flowbite-svelte';
  import { CheckCircleSolid } from 'flowbite-svelte-icons';
  import { slide } from 'svelte/transition';
  let endpoints = false;
  let available='Unavailable';
  let color = 'red';
  let toastStatus = false;
  let counter = 5;

  async function test_endpoints(){
    
    endpoints = invoke('test_endpoints', { });
    if(endpoints == true){
      color = 'green';
      available = 'Available';
      toastStatus = true;
      timeout();
      
    }
    else{
      color = 'red';
      available = 'Unavailable';
    }
  }
  function timeout(){
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;

}
</script>
<html class="dark" lang="en">
<body width="100vw" height="100vh">
    <div on:load="{test_endpoints}" style="display: flex; padding-left:5%;">
      <P size="base">IPFS facilities are: </P> <Badge color="{color}" rounded class="px-2.5 py-0.5" style="margin-left:10px;">
        <Indicator color="{color}" size="xs" class="me-1" />{available}
      </Badge>
    </div>
    <div style="padding-left: 5%;">
      <GradientButton on:click="{test_endpoints}">Re-Test</GradientButton>
    </div>
    <div class="flex gap-10">
  
  <Toast dismissable={true} transition={slide} bind:toastStatus>
    <CheckCircleSolid slot="icon" class="w-5 h-5" />
    It is now available
  </Toast>
</div>
    </body>
  </html>
