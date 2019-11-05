import { render } from '@testing-library/angular';

import { LoadingSpinnerComponent } from './loading-spinner.component';

it('Should render without crashing', async () => {
  const { getByTestId } = await render(LoadingSpinnerComponent);

  expect(getByTestId('loadingSpinner'));
});
