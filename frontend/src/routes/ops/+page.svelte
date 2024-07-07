<script lang="ts">
  import { Tabs, TabItem, Button, Toast } from 'flowbite-svelte';
  import { ArchiveSolid, ArrowDownToBracketOutline, CloseCircleSolid, CheckCircleSolid, ClipboardListSolid, TableRowSolid } from 'flowbite-svelte-icons';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';

  import { Timeline, TimelineItem, Activity, ActivityItem, Group, GroupItem } from 'flowbite-svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  import { fly } from 'svelte/transition';
  import { Input, Label } from 'flowbite-svelte';

  let result: string | null = null;
  let counter = 5;
  let toastStatus = false;
  let displayedText: string = "";

  async function _package() {
    invoke('log_message', { message: "package is running" });
    displayedText = "Waiting ...";
    result = await invoke('package_existing_file_mfs');
    if (result == null) {
      toastStatus = true;
      timeout();
    } else {
      displayedText = result;
    }
  }

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
  }

  let hash = '';
  let new_file_path: string = '';
  let toastStatus1 = false;
  let displayedText1: string = "";
  let counter1 = 5;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    invoke('log_message', { message: "Mukund may have some merit" });
    invoke('log_message', { message: "Not entirely stupid, hash: " + hash });
    displayedText1 = "Waiting for download to finish...";
    new_file_path = await invoke('download_file_mfs', { mfsHash: hash });
    if (new_file_path) {
      toastStatus1 = true;
      displayedText1 = new_file_path;
      timeout1();
      invoke('log_message', { message: "The new file path: " + new_file_path });
    }
  }

  function timeout1() {
    if (--counter1 > 0) return setTimeout(timeout1, 1000);
    toastStatus1 = false;
  }
  let json = '';

  async function getTableData(){
    console.log('running getTableData function');
    invoke('log_message', {message:"Running get table data function"});
    json = await invoke('recall_latest_hashes');
    console.log(json);
    // time to reformat the json so its

  }
</script>

<html class="dark" lang="en">
  <body width="100vw" height="100vh">
    <Tabs>
      <TabItem open>
        <div slot="title" class="flex items-center gap-2">
          <ArchiveSolid size="md" />
          Package
        </div>
         <span style="opacity:1;color:white;">Press that button to upload your file:</span>
        <Button on:click={_package} pill>Get Started!</Button>
        <div>
          <Label class="space-y-2">
            <br>
            <span>Hash to be used with other matrixfs clients and used in the Download tab</span>
            <Input type="text" placeholder="MatrixFS Hash" size="md" disabled bind:value={displayedText} />
          </Label>
        </div>
        {#if toastStatus}
          <Toast color="red" dismissable={true} transition={fly} params={{ x: 200 }} position="bottom-right">
            <svelte:fragment slot="icon">
              <CloseCircleSolid class="w-5 h-5" />
              <span class="sr-only">Error icon</span>
            </svelte:fragment>
            Not valid
          </Toast>
        {/if}
      </TabItem>
      <TabItem>
        <div slot="title" class="flex items-center gap-2">
          <ArrowDownToBracketOutline size="md" />
          Download
        </div>
        <form class="w-full max-w-lg" on:submit={handleSubmit}>
          <div class="mb-6">
            <Label for="hash">MatrixFS hash that was given to you or the one generated in the Package tab</Label>
            <Input type="text" id="hash" bind:value={hash} required />
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <Label class="space-y-2">
          <br>
          <span>New path:</span>
          <Input type="text" placeholder="New path will show up here!" size="md" disabled bind:value={displayedText1} />
        </Label>
        {#if toastStatus1}
          <Toast color="green" dismissable={false} transition={fly} params={{ x: 200 }} position="bottom-right">
            <svelte:fragment slot="icon">
              <CheckCircleSolid class="w-5 h-5" />
              <span class="sr-only">Check icon</span>
            </svelte:fragment>
            Download Completed!
          </Toast>
        {/if}
      </TabItem>
      <TabItem>
        <div slot="title" class="flex items-center gap-2">
        <TableRowSolid class="w-5 h-5"/>
          Data
        </div>
  <Table on:load={getTableData()}>
  <TableHead>
    <TableHeadCell>Id</TableHeadCell>
    <TableHeadCell>Hash</TableHeadCell>
    <TableHeadCell>Title</TableHeadCell>
    <TableHeadCell>Description</TableHeadCell>
    <TableHeadCell>Tag</TableHeadCell>
    <TableHeadCell>Time</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each json as item (item.id)}
    <TableBodyRow>
      <TableBodyCell>{item.id}</TableBodyCell>
      <TableBodyCell>{item.hash}</TableBodyCell>
      <TableBodyCell>{item.title}</TableBodyCell>
      <TableBodyCell>{item.description}</TableBodyCell>
      <TableBodyCell>{item.tag}</TableBodyCell>
      <TableBodyCell>{item.time_unix}</TableBodyCell>
    </TableBodyRow>
    {/each}
    
  </TableBody>
</Table>

      </TabItem>
      <TabItem>
        <div slot="title" class="flex items-center gap-2">
          <ClipboardListSolid class="w-5 h-5"/>
          Instructions
        </div>
        <Timeline order="horizontal">
  <TimelineItem title="Install ipfs">
    <svelte:fragment slot="icon">
      <div class="flex items-center">
        <div class="flex z-10 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-0 ring-white dark:bg-primary-900 sm:ring-7 dark:ring-gray-900 shrink-0">
          1.
        </div>
        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
      </div>
    </svelte:fragment>
    <p class="text-base font-normal text-gray-500 dark:text-gray-400 ">https://docs.ipfs.tech/install/ipfs-desktop/</p>
  </TimelineItem>
  <TimelineItem title="Use the Package tab to add the file to your ipfs node">
    <svelte:fragment slot="icon">
      <div class="flex items-center">
        <div class="flex z-10 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-0 ring-white dark:bg-primary-900 sm:ring-7 dark:ring-gray-900 shrink-0">
          2.
        </div>
        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
      </div>
    </svelte:fragment>
    <p class="text-base font-normal text-gray-500 dark:text-gray-400">Press the Get started button in the package tab to get your hash to share with everyone</p>
  </TimelineItem>
  <TimelineItem title="Add your file to the database">
    <svelte:fragment slot="icon">
      <div class="flex items-center">
        <div class="flex z-10 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-0 ring-white dark:bg-primary-900 sm:ring-7 dark:ring-gray-900 shrink-0">
          3.
        </div>
        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
      </div>
    </svelte:fragment>
    <p class="text-base font-normal text-gray-500 dark:text-gray-400">This will be implemented in the future :) I hope... <br>After that, you can share the hash you made and you can make your thing searchable</p>
  </TimelineItem>
</Timeline>
      </TabItem>
    </Tabs>
  </body>
</html>

