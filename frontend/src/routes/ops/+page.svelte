<script>
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { ArchiveSolid, ArrowDownToBracketOutline } from 'flowbite-svelte-icons';
</script><html class="dark" lang="en">
  <body width="100vw" height="100vh">
    <Tabs>
  <TabItem open>
    <div slot="title" class="flex items-center gap-2">
      <ArchiveSolid size="md" />
      Package
    </div>



    


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
