import React from 'react';
import { SimpleLayout } from '../layouts';
import { GridPostPreviews } from '../components';
import { data } from '../mock';

export default () => (
  <SimpleLayout>
    <GridPostPreviews data={data} />
  </SimpleLayout>
);
