export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type AsProp<C extends React.ElementType> = {
  as?: C
}

export type ExtendableProps<
  ExtendedProps = Record<string, unknown>,
  OverrideProps = Record<string, unknown>,
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

export type InheritableElementProps<
  C extends React.ElementType,
  Props = Record<string, unknown>,
> = ExtendableProps<PropsOf<C>, Props>

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = Record<string, unknown>,
> = InheritableElementProps<C, Props & AsProp<C>>
