function ExternalLink({ href, children, className = '', icon }) {
  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" className="ml-0.5 inline-block h-3.5 w-3.5">
      <path d="M14 38h-4v-4h4v4Zm4-4h-4v-4h4v4Zm20 0h-4V18h-4v-4H14v-4h24v24Zm-16-4h-4v-4h4v4Zm4-4h-4v-4h4v4Zm4-4h-4v-4h4v4Z" />
    </svg>
  );
  return (
    <a href={href} target="_blank" rel="noopener" className={`${className} inline-block decoration-wavy underline-offset-2 hover:text-neutral-50 hover:underline`}>
      {children}
      {icon ?? defaultIcon}
    </a>
  );
}

export default ExternalLink;
