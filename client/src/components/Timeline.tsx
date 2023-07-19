import React, { useState } from 'react';
import Post from './Post';
import apiClient from '@/lib/apiClient';

const Timeline = () => {
  const [postText, setPostText] = useState<string>('');
  //非同期処理
  const handleSubmi = async (e: React.FormEvent<HTMLFormElement>) => {
    //リロードを避ける
    e.preventDefault();

    //呟きAPI呼出し
    try {
      await apiClient.post('/posts/post', {
        content: postText,
      });

      setPostText('');
    } catch (err) {
      alert('ログインしてください。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmi}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPostText(e.target.value)
              }
              //投稿ボタン押下後空にする
              value={postText}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </main>
    </div>
  );
};

export default Timeline;
