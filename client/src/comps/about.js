import React from 'react';
import Hero, { heroImg } from './common/hero';
import PageHeader from './common/pageHeader';
import '../css/about.css'

function About(props){
  return(
    <div>
      <Hero imgPath={heroImg} heroTitle={'Who R We?'} />
      <PageHeader title="About"/>
      <div className="headingImage mx-auto" style={{backgroundImage:'url(images/whatwedo.png)'}} ></div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque eveniet natus ullam repellat. Reprehenderit nulla enim ab quia similique sit recusandae iure quasi iusto officiis, praesentium dolorem consequuntur odit mollitia quo eligendi vero aspernatur, accusantium optio vitae minima, neque iste! Porro illo doloribus quo officiis molestiae ut quas at voluptatem praesentium voluptatum optio sapiente quos ipsam repudiandae omnis laboriosam, magnam est accusantium fuga, harum consequatur maxime! Quos magnam, voluptatum iure est suscipit vel, laborum, impedit doloribus sunt nesciunt autem accusamus minus dicta doloremque veritatis. Nihil aut doloribus quis eligendi, fugit itaque aperiam earum numquam sit maiores a! In, dignissimos hic!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque eveniet natus ullam repellat. Reprehenderit nulla enim ab quia similique sit recusandae iure quasi iusto officiis, praesentium dolorem consequuntur odit mollitia quo eligendi vero aspernatur, accusantium optio vitae minima, neque iste! Porro illo doloribus quo officiis molestiae ut quas at voluptatem praesentium voluptatum optio sapiente quos ipsam repudiandae omnis laboriosam, magnam est accusantium fuga, harum.
      </p>
    </div> 
  )
}

export default About