import { render } from '@testing-library/angular';

import { ErrorMessageComponent } from './error-message.component';

it('Should render without crashing', async () => {
  const { getByText } = await render(ErrorMessageComponent);

  expect(getByText('Something went wrong ):'));
});
