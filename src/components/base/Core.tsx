import { PureComponent } from 'react';

import initAxios from 'src/lib/api/axios';

interface Props {}

class Core extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    initAxios();
  }

  render() {
    return null;
  }
}

export default Core;
