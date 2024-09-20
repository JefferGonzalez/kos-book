export default function UploadForm() {
  return (
    <form
      className='bg-ziggurat-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-[334px]'
      method='post'
      encType='multipart/form-data'
    >
      <div className='mb-4'>
        <label
          className='block text-gray-900 text-sm font-bold mb-2'
          htmlFor='name'
        >
          Project's name
        </label>
        <input
          className='bg-ziggurat-750 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='name'
          type='text'
          placeholder='Write the name of the project'
          name='name'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-900 text-sm font-bold mb-2'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          className='bg-ziggurat-750 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='description'
          placeholder='Write the project description'
          name='description'
          required
        ></textarea>
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-900 text-sm font-bold mb-2'
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
          className='bg-ziggurat-50 text-ziggurat-900 border w-full border-gray-300 rounded cursor-pointer py-2 px-4 inline-flex items-center'
        >
          Choose file
        </label>
      </div>
      <div className='flex items-center justify-center'>
        <button
          id='submit'
          className='bg-ziggurat-850 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Save
        </button>
      </div>
    </form>
  )
}
