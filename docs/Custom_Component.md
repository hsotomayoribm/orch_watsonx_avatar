## Custom ReactJS Component Creation

- [File Structure](#file-structure)
- [Sample Code](#sample-code)
  1. [React Component](#react-component)
  2. [scss Module](#scss-module)
  3. [index.js](#index.js)

## File Structure

```sh
├── react-ui
│   ├── src
│   │   ├── components
│   │   │   ├── ContentCards
│   │   │   │   ├── <Custom Component>
│   │   │   │   │   ├── <Custom Component>.js
│   │   │   │   │   ├── <Custom Component>.module.scss
│   │   │   │   │   ├── index.js
```

## Sample Code

### React Component

`<Custom Component>.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import styles from './<Custom Component>.module.scss';

const <Custom Component> = ({ data }) => {
  const { title, content, subtitle, cardId } = data;
  return (
    <div data-sm-content={cardId} className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__title}>{title}</div>
        <div className={styles.card__subtitle}>{subtitle}</div>
        <div className={styles.card__content}>{content}</div>
      </div>
    </div>
  );
};
<Custom Component>.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
  }).isRequired,
};

export default <Custom Component>;
```

`styles` is imported from `<Custom Component>.module.scss`.

`data` is the json that is provided from the WA dialog/action context/session variable.

Example data from WA:
```
{
  "id": "<component id>",
  "data": {
    "title": "This is a Custom React Component",
    "content": "Look at this dialog node to see an example",
    "subtitle": "Simply pass data from Watson in a response"
  },
  "type": "<component name>"
}

```

`data-sm-content={cardId}` is using the `id` from that json for Digital Avatar to have content awareness.

### scss Module

`<Custom Component>.module.scss`

```
.card {
  position: absolute;
  top: 0%;
  right: 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 10rem;
  max-width: 30rem;
  &__container {
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
    background-color: rgba(221, 225, 230, 1);
    & * {
      padding: 0 1rem;
      font-weight: 200;
    }
  }
  &__title {
    color: rgba(255, 255, 255, 1);
    font-weight: 200;
    font-size: 1.5rem;
    background-color: #4d5358;
    margin-bottom: 1rem;
  }
  &__subtitle {
    color: rgba(0, 0, 0, 0.7);
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  &__content {
    display: flex;
    color: rgba(0, 0, 0, 0.6);
    font-size: 1rem;
    text-align: justify;
  }
}
```

### index.js

`index.js`
Index is used to ease reference calls from elsewhere in the code base.

```
import <Custom Component> from './<Custom Component>';
export default <Custom Component>;
```
