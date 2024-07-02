<script lang="ts">
  import { Tabs, TabItem, Button, Toast } from 'flowbite-svelte';
  import { ArchiveSolid, ArrowDownToBracketOutline, CloseCircleSolid } from 'flowbite-svelte-icons';
  import { invoke } from '@tauri-apps/api/tauri';
  import { fly } from 'svelte/transition';
  import CopyBox from '$lib/components/CopyBox.svelte';
  import { Input, Label, Helper } from 'flowbite-svelte';
  let result = null;
  let counter = 5;
  let toastStatus = false;
  let copyStatus = false;
  let displayedText: String = "Loading ....";
  async function _package(){
    invoke('log_message', {message: "package is running"});
    result = await invoke('package_existing_file_mfs', { } );
    if(result == null){
      toastStatus = true;
      timeout();
    }
    else{
      displayedText=result;
    }
  }
  function timeout(){
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
  }
</script><html class="dark" lang="en">
  <body width="100vw" height="100vh">
<Tabs>
  <TabItem open>
    <div slot="title" class="flex items-center gap-2">
      <ArchiveSolid size="md" />
      Package
    </div>
    
    <Button on:click="{_package}" pill>Get Started!</Button>
      <div>
  <Label class="space-y-2">
  <br>
  <span>Hash to be used with other matrixfs clients</span>
  <Input type="text" placeholder="MatrixFS Hash" size="md" disabled bind:value={displayedText}/>
</Label>
</div>
       <Toast color="red" dismissable={true} transition={fly} params={{x:200}} bind:toastStatus position="top-right">
      <svelte:fragment slot="icon">
        <CloseCircleSolid class="w-5 h-5" />
        <span class="sr-only">Error icon</span>
      </svelte:fragment>
      Not valid
    </Toast>
  </TabItem>
  <TabItem>
    <div slot="title" class="flex items-center gap-2">
      <ArrowDownToBracketOutline size="md" />
      Download
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Settings:</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>
</Tabs>
  </body>
</html>
