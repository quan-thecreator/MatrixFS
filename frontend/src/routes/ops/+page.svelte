<script lang="ts">
  import { Tabs, TabItem, Button, Toast } from 'flowbite-svelte';
  import { ArchiveSolid, ArrowDownToBracketOutline, CloseCircleSolid, CheckCircleSolid, ClipboardListSolid, TableRowSolid,PlusOutline, ChevronDownOutline, FilterSolid, ChevronRightOutline, ChevronLeftOutline } from 'flowbite-svelte-icons';
  import { Section } from 'flowbite-svelte-blocks';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Dropdown, DropdownItem, Checkbox, ButtonGroup } from 'flowbite-svelte';

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
  let tags = {};

  let divClass='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
  let innerDivClass='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
  let searchClass='w-full md:w-1/2 relative';
  let svgDivClass='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
  let classInput="text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10";

  let searchTerm = '';
  let currentPosition = 0;
  const itemsPerPage = 10;
  const showPage = 5;
  let totalPages = 0;
  let pagesToShow = [];
  let totalItems;
  let startPage;
  let endPage;
  async function getTop5TableData(){
    console.log('running getTableData function');
    invoke('log_message', {message:"Running get table data function"});
    json = await invoke('recall_latest_hashes');
    
    // time to reformat the json so its
    

  }
  async function getTableData(){
    console.log('running getTableData function');
    invoke('log_message', {message:"Running get table data function"});
    paginationData = await invoke('recall_all_hashes');
    tags = await invoke('recall_tags');
    totalItems = paginationData.length;
    // time to reformat the json so its
    renderPagination(paginationData.length);

  }
  const updateDataAndPagination = () => {
    const currentPageItems = paginationData.slice(currentPosition, currentPosition + itemsPerPage);
    renderPagination(currentPageItems.length);
  }

  const loadNextPage = () => {
    if (currentPosition + itemsPerPage < paginationData.length) {
      currentPosition += itemsPerPage;
      updateDataAndPagination();
    }
  }

  const loadPreviousPage = () => {
    if (currentPosition - itemsPerPage >= 0) {
      currentPosition -= itemsPerPage;
      updateDataAndPagination();
    }
  }

  const renderPagination = (totalItems) => {
    totalPages = Math.ceil(paginationData.length / itemsPerPage);
    const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);

    startPage = currentPage - Math.floor(showPage / 2);
    startPage = Math.max(1, startPage);
    endPage = Math.min(startPage + showPage - 1, totalPages);

    pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  const goToPage = (pageNumber) => {
    currentPosition = (pageNumber - 1) * itemsPerPage;
    updateDataAndPagination();
  }
  getTableData();
  $: startRange = currentPosition + 1;
  $: endRange = Math.min(currentPosition + itemsPerPage, totalItems);

  $: currentPageItems = paginationData.slice(currentPosition, currentPosition + itemsPerPage);
  $: filteredItems = paginationData.filter((item) => {
  const searchTermLower = searchTerm.toLowerCase();
  return (
    item.title.toLowerCase().indexOf(searchTermLower) !== -1 ||
    item.hash.toLowerCase().indexOf(searchTermLower) !== -1
  );
});
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
        <Table on:load={getTop5TableData()}>
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
        <Section name="advancedTable" classSection='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5' on:load={getTableData()}>
    <TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm} {divClass} {innerDivClass} {searchClass} {classInput} >

    <div slot="header" class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
      <Button>
        <PlusOutline class="h-3.5 w-3.5 mr-2" />Add item
      </Button>
      
      <Button color='alternative'>Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
        <Dropdown class="w-48 p-3 space-y-2 text-sm">
          <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose category</h6>
          {#each tags as tag}
          <li>
            <Checkbox>{tag.name}</Checkbox>
          </li>
          {/each}
          
        </Dropdown>
    </div>
      <TableHead>
        <TableHeadCell padding="px-4 py-3" scope="col">ID</TableHeadCell>
        <TableHeadCell padding="px-4 py-3" scope="col">Hash</TableHeadCell>
        <TableHeadCell padding="px-4 py-3" scope="col">Title</TableHeadCell>
        <TableHeadCell padding="px-4 py-3" scope="col">Description</TableHeadCell>
        <TableHeadCell padding="px-4 py-3" scope="col">Tag</TableHeadCell>
        <TableHeadCell padding="px-4 py-3" scope="col">Time</TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
        {#if searchTerm !== ''}
          {#each filteredItems as item (item.id)}
            <TableBodyRow>
              <TableBodyCell tdClass="px-4 py-3">{item.id}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.hash}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.title}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.description}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.tag}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.time_unix}</TableBodyCell>
            </TableBodyRow>
          {/each}
        {:else}
          {#each currentPageItems as item (item.id)}
            <TableBodyRow>
              <TableBodyCell tdClass="px-4 py-3">{item.id}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.hash}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.title}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.description}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.tag}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.time_unix}</TableBodyCell>
            </TableBodyRow>
          {/each}
        {/if}
      </TableBody>
      <div slot="footer" class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
      </span>
        <ButtonGroup>
          <Button on:click={loadPreviousPage} disabled={currentPosition === 0}><ChevronLeftOutline size='xs' class='m-1.5'/></Button>
          {#each pagesToShow as pageNumber}
            <Button on:click={() => goToPage(pageNumber)}>{pageNumber}</Button>
          {/each}
          <Button on:click={loadNextPage} disabled={ totalPages === endPage }><ChevronRightOutline size='xs' class='m-1.5'/></Button>
        </ButtonGroup>
      </div>
    </TableSearch>
</Section> 

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

