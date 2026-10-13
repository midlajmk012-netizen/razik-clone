import {createFileRoute} from '@tanstack/react-router';
import {PageHeader,Contact,Footer,pageHead} from '@/components/portfolio';
export const Route=createFileRoute('/contact')({head:()=>pageHead('Contact — Work with Razi KV','Get in touch with Muhammed Razi KV about web design, development and creative projects.'),component:ContactPage});
function ContactPage(){return <><PageHeader/><main><Contact/></main><Footer/></>}
