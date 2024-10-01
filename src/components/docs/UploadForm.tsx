import "@/styles/Button.css"
export default function UploadForm() {
  return (
    <form
      className='bg-white shadow-lg rounded-lg px-10 py-8 mb-6 w-full max-w-lg mx-auto'
      method='post'
      encType='multipart/form-data'
    >
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Upload your code
      </h2>

      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'
        >
          Project&apos;s name
        </label>
        <input
          className='bg-gray-50 shadow-inner border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200'
          id='name'
          type='text'
          placeholder='Write the name of the project'
          name='name'
          required
        />
      </div>

      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          className='bg-gray-50 shadow-inner border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200'
          id='description'
          placeholder='Write the project description'
          name='description'
          rows='4'
          required
        ></textarea>
      </div>

      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='file'
        >
          Code
        </label>
        <input
          className='hidden'
          id='file'
          name='file'
          type='file'
          accept='.zip'
          multiple
          required
        />
        <label
          id='file-name'
          htmlFor='file'
          className='bg-blue-50 text-blue-700 border border-gray-300 rounded-lg cursor-pointer py-2 px-4 inline-flex items-center transition duration-200 hover:bg-blue-100'
        >
          Choose file
        </label>
      </div>

      <div className='flex items-center justify-center'>
        <button
          id='submit'
          className='button button_upload'
          type='submit'
        >
          Save
        </button>
      </div>
    </form>
  )
}
