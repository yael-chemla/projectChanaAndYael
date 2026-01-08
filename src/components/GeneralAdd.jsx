function GeneralAdd({ value, setValue, onAdd, placeholder, buttonText, isTextArea = false }) {
  return (
    <div className="generic-add-form">
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      <button type="button" onClick={onAdd}>
        {buttonText}
      </button>
    </div>
  );
}

export default GeneralAdd;