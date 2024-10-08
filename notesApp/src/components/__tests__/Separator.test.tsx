import React from 'react';
import {render} from '@testing-library/react-native';
import Separator from '../Separator';

describe('Separator Component', () => {
  it('renders correctly with height', () => {
    const {getByTestId} = render(<Separator height={10} />);
    const separator = getByTestId('Separator');

    expect(separator.props.style.height).toBe(10);
  });

  it('renders correctly with width', () => {
    const {getByTestId} = render(<Separator width={20} />);
    const separator = getByTestId('Separator');

    expect(separator.props.style.width).toBe(20);
  });

  it('renders correctly with both height and width', () => {
    const {getByTestId} = render(<Separator height={15} width={30} />);
    const separator = getByTestId('Separator');

    expect(separator.props.style.height).toBe(15);
    expect(separator.props.style.width).toBe(30);
  });

  it('renders correctly with no props', () => {
    const {getByTestId} = render(<Separator />);
    const separator = getByTestId('Separator');

    expect(separator.props.style).toEqual({});
  });
});
