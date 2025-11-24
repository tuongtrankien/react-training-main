const InputField : React.FC<{label: string, id: string} & React.InputHTMLAttributes<HTMLInputElement>> = ({label, id, ...props}) => {
    return (
      <div>
        <div>
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
        </label>
        <input 
          id={id} 
          {...props} 
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
      </div> 
      </div> 
    )
}

export default InputField;