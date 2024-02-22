import { useRouter } from 'next/router';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect ,useState} from 'react';
import { getContentfulClient } from 'src/helper/contentful-client';
import styles from "./blogPost.module.scss"

const BlogPost = () => {
  const router = useRouter(); 
  const {slug, page} = router.query;

  const [blog, setblog] = useState({});
  
  useEffect(() => { 
    if (slug) {
      getBlogsData(slug).then((data) => {
        console.log("data", data);  
        if(data?.props?.blog){
          setblog(data?.props?.blog);
        }else{
          // router.push("/home");
        }
       } );
    }
  }, [slug]);
 
  return (
    <div className={styles.container}>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
        <div>
            {documentToReactComponents(blog?.content)}
        </div>
    </div>
  );
};

export async function getBlogsData(slug) {
  const response = await getContentfulClient().getEntries({
    content_type: 'blogs', // Adjust according to your content type ID
    'fields.slug': slug,
  });

  // Ensure we found something, otherwise return a 404
  if (!response.items.length) {
    return { notFound: true };
  }

  // Assuming only one entry per slug
  const blog = response.items[0].fields;

  return {
    props: { blog },
    revalidate: 1, // Enable ISR
  };
}

BlogPost.showHeaderFooter = true;
export default BlogPost;
