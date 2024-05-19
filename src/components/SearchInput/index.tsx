'use client';

import { SearchIcon, XIcon } from 'lucide-react';

import './index.css';
import { Autocomplete, AutocompleteProps, TextInputProps } from '@mantine/core';

export default function SearchInput(
  props: AutocompleteProps & { disableAutoComplete?: boolean },
) {
  return (
    <>
      <Autocomplete
        limit={5}
        // rightSection={
        //   isFetching ? (
        //     <Loader size={25} />
        //   ) : (
        //     <>
        //       {search.length === 0 ? null : (
        //         <div
        //           onClick={() => {
        //             setValue('');
        //           }}
        //           className="p-2 cursor-pointer mr-2">
        //           <XIcon size={'25'} color="#efefef" />
        //         </div>
        //       )}
        //     </>
        //   )
        // }
        placeholder="Target location"
        className="input-main-search"
        filter={(item) => {
          return item.options;
        }}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' &&
            !props.disableAutoComplete &&
            props?.value?.length > 0
          ) {
            e.preventDefault();
            // navigate(`/search?query=${value}`);
          }
        }}
        rightSectionWidth={42}
        radius="md"
        leftSection={<SearchIcon size="25" color="gray" />}
        size="lg"
        data={props.disableAutoComplete ? [] : props.data.map((item) => item)}
        onOptionSubmit={(value) => {
          // navigate(`/search?query=${value}`);
        }}
        {...props}
      />
    </>
  );
}
