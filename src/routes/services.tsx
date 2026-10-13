import {createFileRoute} from '@tanstack/react-router';
import {PageHeader,Services,Marquee,Footer,pageHead} from '@/components/portfolio';
export const Route=createFileRoute('/services')({head:()=>pageHead('Services — Razi KV','Web development, e-commerce, SEO, digital marketing, graphic design and server management by Razi KV.'),component:ServicesPage});
function ServicesPage(){return <><PageHeader/><main><Services/><Marquee/></main><Footer/></>}
