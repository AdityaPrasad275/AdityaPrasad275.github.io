latex

%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \usepackage[sfdefault]{FiraSans}
% \usepackage[sfdefault]{roboto}
% \usepackage[sfdefault]{noto-sans}
% \usepackage[default]{sourcesanspro}

% serif
% \usepackage{CormorantGaramond}
% \usepackage{charter}


\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

\definecolor{linkgray}{RGB}{100,100,100}


%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \text{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small #1 &
      {\scriptsize \textcolor{linkgray}{\href{https://#2}{\underline{#2}}}}
 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{
  \begin{itemize}[leftmargin=*, labelsep=0.5em]
}

\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\begin{document}

%----------HEADING----------
% \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
%   \textbf{\href{http://sourabhbajaj.com/}{\Large Sourabh Bajaj}} & Email : \href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\
%   \href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\
% \end{tabular*}

\begin{center}
    \textbf{\Huge \scshape Aditya N Prasad} \\ \vspace{1pt}
    \href{mailto:adityanprasad275@gmail.com}{\underline{adityanprasad275@gmail.com}} $|$ \href{https://github.com/AdityaPrasad275}{\underline{github.com/AdityaPrasad275}}
\end{center}


%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    \resumeSubheading
      {Indian Institute of Technology, Bombay}{May 2025}
      {Bachelors of Technology in Chemical Engineering with a Minor in Computer Science}{}
  \resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart

    \resumeSubheading
      {Graduate Engineer Trainee}{June 2025 -- Present}
      {OLA Electric, Cell Research Division}{Bangalore, Karnataka}
      \resumeItemListStart
        \resumeItem{Engineered a full-stack data exploration platform (\textbf{React + Python microservices + Arrow IPC}) for low latency
interactive display of high-density time-series (\textbf{600k+} datapoints) and experiment data (\textbf{50+} params)}
        \resumeItem{Built a high-volume time-series processing pipeline \textbf{(Polars + Parquet)} for \textbf{2000+} battery cells per batch,
optimizing charge–discharge segmentation and reducing processing time from \textbf{20+} minutes to \textbf{3} minutes}
        \resumeItem{Designed a flexible manufacturing data model (\textbf{Django + DRF}) enabling cross-process lineage tracking for battery
cells across \textbf{12} processing steps; handling dynamic JSON-based parameters (\textbf{100+}) for heterogeneous process lines}
        \resumeItem{Developed an automated batch analytics system (Linux VM + \textbf{rclone + Uvicorn}) to continually consume factory data,
generate plots and \textbf{KPIs} on a self updating management dashboards facilitating prompt decision making}
      \resumeItemListEnd
      
% -----------Multiple Positions Heading-----------
%    \resumeSubSubheading
%     {Software Engineer I}{Oct 2014 - Sep 2016}
%     \resumeItemListStart
%        \resumeItem{Apache Beam}
%          {Apache Beam is a unified model for defining both batch and streaming data-parallel processing pipelines}
%     \resumeItemListEnd
%    \resumeSubHeadingListEnd
%-------------------------------------------

    \resumeSubheading
      {Advanced Application Engineering Intern}{May 2024 – July 2024}
      {Accenture}{Bangalore, Karnataka}
      \resumeItemListStart
        \resumeItem{Integrated GenAI solutions into \textbf{Oracle Fusion Cloud} to cut manual effort and strengthen HR operational efficiency}
        \resumeItem{Automated HR processes for a US client with a \textbf{\$5M} budget, reducing HR workload of \textbf{120+} personnel hours}
        \resumeItem{Streamlined payroll, hiring, and absence management across \textbf{20+} departments supporting \textbf{30,000+} employees}
    \resumeItemListEnd

   

  \resumeSubHeadingListEnd


%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
      \resumeProjectHeading
          {\textbf{InteReview.ai} $|$ \emph{ExpressJS, ReactJS}}{github.com/AdityaPrasad275/mock-interview-ai}
          \resumeItemListStart
            \resumeItem{Developed an \textbf{LLM} mock interview chatbot with a reviewer loop to assist in improvement of candidate’s answer}
            \resumeItem{Built a robust chat app using \textbf{ReactJS} for the frontend interface and \textbf{Express/Node.JS }for backend functionality}
            \resumeItem{Programmed consistent knowledge transfer across LLMs using prompting and \textbf{GraphRAG} knowledge retrieval}
          \resumeItemListEnd
      \resumeProjectHeading
          {\textbf{In-Browser IDE for CSES Problem Set} $|$ \emph{TypeScript, React}}{github.com/AdityaPrasad275/cses-ide}
          \resumeItemListStart
            \resumeItem{Engineered a \textbf{TypeScript + React} IDE with Monaco Editor for a LeetCode-style in-browser coding experience}
            \resumeItem{Added persistent local storage and \textbf{sandboxed execution} to ensure a secure and reliable developer workflow}
          
          \resumeItemListEnd

          \resumeProjectHeading
          {\textbf{ComicGPT} $|$ \emph{ExpressJS, ReactJS}}{github.com/AdityaPrasad275/ComicGPT}
          \resumeItemListStart
            \resumeItem{Collaborated in developing a text-to-comic pipeline integrating \textbf{Stable Diffusion} and LLMs for fluid storytelling}
            \resumeItem{Improved story coherence by \textbf{15\%} through diffusion technologies like embeddings, U-Nets and VAEs}
            \resumeItem{Applied \textbf{LoRAs} and prompt engineering to achieve \textbf{65\%} consistency in art style, theme, and characters}
          \resumeItemListEnd
    \resumeSubHeadingListEnd



%
%-----------PROGRAMMING SKILLS-----------
\section{Technical Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{Languages}{: Python, C++, JavaScript} \\
     \textbf{Frameworks}{: ReactJS, Node.js, Express, Django, Django Rest Framework} \\
     \textbf{Libraries}{: LangChain, LangGraph, CrewAI, Diffusers, LoRA, GraphRAG, Pandas, Polars}
    }}
 \end{itemize}

%------------------ Extracuricular--------------------
\section{Extracurricular Activities}
\resumeItemListStart
\resumeItem{\textbf{Creative Work}: Built a \textbf{Selenium}-based automation tool for parsing and solving \textbf{H5P} interactive quizzes}
\vspace{-7pt}
\resumeItem{\textbf{Equity Market Analyst (Finlatics)}: Evaluated 4 companies using \textbf{SWOT}; gained \textbf{10.6\%} profit in simulated trading}
\vspace{-17pt}
\resumeItem{\textbf{NCC Cadet}: Earned \textbf{B and C} certificates (\textbf{2nd}-highest grade); attended two \textbf{10}-day CATC camps; scored \textbf{47/50}}

\resumeItemListEnd

%-------------------------------------------
\end{document}
