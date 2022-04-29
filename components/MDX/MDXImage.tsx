import ImageCard from '@components/ImageCard';

interface Props {
  src?: string;
  title?: string;
  alt?: string;
}

const MDXImage = (props: Props): JSX.Element => <ImageCard {...props} />;

export default MDXImage;
