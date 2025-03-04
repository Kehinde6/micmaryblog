import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { getSimilarPosts, getRecentPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        console.log('Recent Posts in Widget:', result);
        setRelatedPosts(result);
      });
    }
  }, [slug, categories]);

  if (!relatedPosts.length) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post, index) => (
        <div
          key={post.slug || index}
          className="flex border-b border-gray-200 items-center w-full mb-4 pb-4 last:border-0"
        >
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.featuredImage?.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link 
              href={`/post/${post.slug}`} 
              className="text-md hover:text-pink-600 transition duration-200"
            >
              {post.title}
            </Link>
            {post.excerpt && (
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
