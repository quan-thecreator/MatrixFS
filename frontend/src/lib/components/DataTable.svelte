<script lang="ts">
  import { onMount } from 'svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Dropdown, Checkbox, ButtonGroup, Modal, Textarea, Input, Label } from 'flowbite-svelte';
  import { Section } from 'flowbite-svelte-blocks';
  import { PlusOutline, FilterSolid, ChevronRightOutline, ChevronLeftOutline } from 'flowbite-svelte-icons';
  import { invoke } from '@tauri-apps/api/tauri';
  export let paginationData: Array<any> = [];
  export let tags: Array<any> = [];

  let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg w-full';
  let innerDivClass = 'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 w-full';
  let searchClass = 'w-full md:w-1/2 relative';
  let classInput = "text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 pl-10";

  let searchTerm = '';
  let selectedTags = new Set<string>();
  let currentPosition = 0;
  const itemsPerPage = 10;
  const showPage = 5;
  let totalPages = 0;
  let pagesToShow: number[] = [];
  let totalItems = paginationData.length;
  let startPage = 1;
  let endPage = 1;
  let paginationDataHeaders: string[] = [];
  let currentPageItems: any[] = [];
  let tagDictionary = tags.reduce((acc, tag) => {
    acc[`${tag.id}`] = tag.name;
    return acc;
  }, {});

  onMount(() => {
    if (paginationData.length > 0) {
      paginationDataHeaders = Object.keys(paginationData[0]);
      totalItems = paginationData.length;
      renderPagination(totalItems);
    }
  });

  const updateDataAndPagination = () => {
    renderPagination(filteredItems.length);
  }

  const loadNextPage = () => {
    if (currentPosition + itemsPerPage < filteredItems.length) {
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

  const renderPagination = (totalItems: number) => {
    totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);

    startPage = currentPage - Math.floor(showPage / 2);
    startPage = Math.max(1, startPage);
    endPage = Math.min(startPage + showPage - 1, totalPages);

    pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    // Update currentPageItems based on filteredItems and currentPosition
    currentPageItems = filteredItems.slice(currentPosition, currentPosition + itemsPerPage);
  }

  const goToPage = (pageNumber: number) => {
    currentPosition = (pageNumber - 1) * itemsPerPage;
    updateDataAndPagination();
  }

  const handleTagChange = (tagName: string) => {
    if (selectedTags.has(tagName)) {
      selectedTags.delete(tagName);
    } else {
      selectedTags.add(tagName);
    }
    updateFilteredItems();
  }

  const updateFilteredItems = () => {
    // Filter paginationData based on selected tags and search term
    filteredItems = paginationData.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearchTerm = searchTerm === '' ||
        item.title.toLowerCase().includes(searchTermLower) ||
        item.hash.toLowerCase().includes(searchTermLower);
      const matchesTags = selectedTags.size === 0 || selectedTags.has(tagDictionary[item.tag]); // Adjust according to your data structure
      return matchesSearchTerm && matchesTags;
    });

    // After filtering, update pagination
    renderPagination(filteredItems.length);
  }

  $: startRange = currentPosition + 1;
  $: endRange = Math.min(currentPosition + itemsPerPage, totalItems);

  // Initial filtering based on searchTerm and selected tags
  let filteredItems = paginationData.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm = searchTerm === '' ||
      item.title.toLowerCase().includes(searchTermLower) ||
      item.hash.toLowerCase().includes(searchTermLower);
    const matchesTags = selectedTags.size === 0 || selectedTags.has(tagDictionary[item.tag]); // Adjust according to your data structure
    return matchesSearchTerm && matchesTags;
  });

  // Trigger renderPagination whenever filteredItems changes
  $: renderPagination(filteredItems.length);

  let model = false;

  function showModel() {
    console.log("showmodel is running");
    model = true;
  }
  let hashValue = '';
  let titleValue = '';
  let descriptionValue = '';
  let tagValue = '';
  async function addToDB() {
    // Access the values from inputs
    console.log("Adding to DB:");
    console.log("Hash:", hashValue);
    console.log("Title:", titleValue);
    console.log("Description:", descriptionValue);
    console.log("Large Input:", tagValue);
    
    // Reset values or submit to backend, etc.
    await invoke('add_hash_db', { hash: hashValue, title: titleValue, description: descriptionValue, tag: tagValue });

    resetModalInputs(); // Optionally reset inputs after submission
  }

  function resetModalInputs() {
    // Reset input values after submission
    hashValue = '';
    titleValue = '';
    descriptionValue = '';
    tagInputValue = '';
  }
</script>

<style>
  /* Add your custom styles here */
</style>

<Section name="advancedTable" classSection='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 w-full'>
  <div class="w-full overflow-x-auto">
    <TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm} {divClass} {innerDivClass} {searchClass} {classInput} class="w-full">
      <div slot="header" class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <!-- Properly bind the function reference without invoking it -->
        <Button on:click={showModel}>
          <PlusOutline class="h-3.5 w-3.5 mr-2" />Add hash
        </Button>
        <Button color='alternative'>Filter<FilterSolid class="w-3 h-3 ml-2" /></Button>
        <Dropdown class="w-48 p-3 space-y-2 text-sm">
          <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
          {#each tags as tag}
          <li>
            <Checkbox checked={selectedTags.has(tag.name)} on:change={() => handleTagChange(tag.name)}>{tag.name}</Checkbox>
          </li>
          {/each}
        </Dropdown>
      </div>
      <div class="w-full overflow-x-auto">
        <Table>
          <TableHead>
            {#each paginationDataHeaders as header, index}
              <TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
            {/each}
          </TableHead>
          <TableBody class="divide-y">
            {#each currentPageItems as item (item.id)}
              <TableBodyRow>
                {#each paginationDataHeaders as header, index}
                  {#if header == "tag"}
                  <TableBodyCell tdClass="px-4 py-3">{tagDictionary[item[header]]}</TableBodyCell>
                  {:else}
                  <TableBodyCell tdClass="px-4 py-3">{item[header]}</TableBodyCell>
                  {/if}
                {/each}
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </div>
      <div slot="footer" class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 w-full" aria-label="Table navigation">
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
  </div>

  <Modal title="Terms of Service" bind:open={model} autoclose>
    <div class="mb-6">
      <Label for="hash" class="block mb-2">Hash</Label>
      <Input id="hash" size="lg" placeholder="Hash" bind:value={hashValue}/>
    </div>
    <div class="mb-6">
      <Label for="title" class="block mb-2">Title</Label>
      <Input id="title" size="lg" placeholder="Title" bind:value={titleValue}/>
    </div>
    <div class="mb-6">
      <Label for="description" class="block mb-2">Description</Label>
    <Textarea id="description" rows="5" placeholder="Description here" name="desription" label="Your desciption" bind:value={descriptionValue}/>
    </div>
    <div class="mb-6">
      <Label for="tag" class="block mb-2">Tag</Label>
      <Input id="tag" size="lg" placeholder="Tag here" bind:value={tagValue}/>
    </div>
    <svelte:fragment slot="footer">
      <Button on:click={addToDB}>Submit</Button>
      <Button color="alternative">Cancel</Button>
    </svelte:fragment>
  </Modal>
</Section>
