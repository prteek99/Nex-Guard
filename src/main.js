import './style.css'

const app = document.querySelector('#app')

// Analysis State
let analysisState = {
  userInput: '',
  loading: false,
  result: null,
  error: null
}

// Simple Router
const routes = {
  '/': homePage,
  '/analyze': analyzePage,
  '/academy': academyGridPage,
  '/learn': academyShell,
  '/quiz': quizCategoryPage,
  '/quiz/fake-emails': quizAttemptPage,
  '/quiz/dangerous-links': quizAttemptPage,
  '/quiz/red-flags': quizAttemptPage,
  '/quiz/right-action': quizAttemptPage,
  '/examples': academyShell,
  '/simulator': simulatorPage,
}

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + path)
  handleRoute()
}

function handleRoute() {
  const path = window.location.pathname
  const page = routes[path] || homePage
  app.innerHTML = page()

  if (path === '/') initHomeLogic()
  if (path === '/analyze') initAnalyzeLogic()
  if (path === '/academy') initAcademyGridLogic()
  if (path === '/learn' || path === '/examples') initAcademyLogic()
  if (path === '/simulator') initSimulatorLogic()
  if (path.startsWith('/quiz/')) initQuizAttemptLogic()

  window.scrollTo(0, 0)
}

window.addEventListener('popstate', handleRoute)

// Global link listener
document.body.addEventListener('click', e => {
  const link = e.target.closest('[data-link]')
  if (link) {
    e.preventDefault()
    navigate(link.getAttribute('href'))
  }
})

// Navigation Component
function navigation() {
  return `
    <nav>
      <a href="/" class="logo" data-link>
        <div class="logo-icon">🛡️</div>
        NexGuard
      </a>
      <div class="nav-links">
        <a href="/" data-link>Home</a>
        <a href="/academy" data-link>Learn</a>
        <a href="/simulator" data-link>Spot the Phish</a>
      </div>
      <a href="/quiz" class="btn-nav" data-link>Attempt Quiz 🎯</a>
    </nav>
  `
}

// Footer Component
function footer() {
  return `
    <footer class="container">
      <div class="footer-bottom">
        <p>© 2026 NexGuard. Security made simple.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  `
}

// Page: Home
function homePage() {
  return `
    ${navigation()}
    
    <header class="hero">
      <div class="container">
        <div class="status-badge">
          <div class="status-dot"></div>
          System Online
        </div>
        <h1>Stop Phishing Attacks<br>Before They Happen</h1>
        <p>Analyze Any Link, SMS, or Email - Instantly.</p>
        
        <div class="intake-card">
          <div class="intake-body">
            <textarea id="scanInput" placeholder="Paste any suspicious link, SMS, or email content here..."></textarea>
            <div class="intake-footer">
              <button class="btn-primary" id="scanBtn">
                Analyze Message
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
          
          <div class="demo-section">
            <p class="demo-title">Try an example scanner:</p>
            <div class="demo-grid">
              <button class="btn-secondary demo-btn" data-example="sms">Bank SMS</button>
              <button class="btn-secondary demo-btn" data-example="job">Job Offer</button>
              <button class="btn-secondary demo-btn" data-example="url">PayPal Link</button>
              <button class="btn-secondary demo-btn" data-example="upi">UPI Request</button>
            </div>
          </div>
        </div>

        <div id="inlineAnalysisContainer"></div>
        
        <div class="features-grid">
          <a href="/academy" class="f-card" data-link style="text-decoration: none; color: inherit;">
            <div class="f-icon">🛡️</div>
            <h3>Explore Academy</h3>
            <p>Master the art of spotting scams with our comprehensive security guides.</p>
            <span class="f-link">Open Library →</span>
          </a>
          <a href="/quiz" class="f-card" data-link style="text-decoration: none; color: inherit;">
            <div class="f-icon">🎯</div>
            <h3>Test Knowledge</h3>
            <p>Take interactive quizzes to see how well you can spot phishing attempts.</p>
            <span class="f-link">Start Quiz →</span>
          </a>
          <a href="/simulator" class="f-card" data-link style="text-decoration: none; color: inherit;">
            <div class="f-icon">🛡️</div>
            <h3>Spot the Phish</h3>
            <p>Test your instincts! Can you tell a real email from a malicious scam?</p>
            <span class="f-link">Start Challenge →</span>
          </a>
        </div>
      </div>
    </header>
    
    ${footer()}
  `
}

// Page: Academy Shell (Learn, Quiz, Examples)
function academyShell() {
  const path = window.location.pathname
  const content = path === '/quiz' ? quizContent() :
    path === '/examples' ? examplesContent() :
      learnContent()

  return `
    <nav style="box-shadow: none; border-bottom: 1px solid var(--border); border-radius: 0; margin: 0; width: 100%; max-width: 100%; position: sticky; top: 0; background: white;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 1200px;">
        <a href="/" class="logo" data-link>
          <div class="logo-icon" style="background: var(--primary);">🛡️</div>
          NexGuard
        </a>
        
      </div>
    </nav>

    <div class="academy-container">
      <aside class="academy-sidebar">
        <div class="course-progress-box">
          <div class="progress-header">
            <span>Course Progress</span>
            <span class="progress-percent">25%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 25%;"></div>
          </div>
        </div>
        
        <div class="lesson-list">
          <a href="/learn" class="lesson-item active" data-link>
            <div class="lesson-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <div class="lesson-details">
              <span>Lesson 1</span>
              <h4>What is Email Phishing?</h4>
            </div>
          </a>
          <div class="lesson-item locked">
            <div class="lesson-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div class="lesson-details">
              <span>Lesson 2</span>
              <h4>Common Red Flags</h4>
            </div>
          </div>
          <div class="lesson-item locked">
            <div class="lesson-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div class="lesson-details">
              <span>Lesson 3</span>
              <h4>Types of Phishing</h4>
            </div>
          </div>
          <div class="lesson-item locked">
            <div class="lesson-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div class="lesson-details">
              <span>Lesson 4</span>
              <h4>Report & Protect</h4>
            </div>
          </div>
        </div>
        
        <div style="margin-top: auto; background: #f0fdfa; padding: 1.5rem; border-radius: 12px; border: 1px solid #ccfbf1;">
          <div style="display: flex; gap: 0.5rem; color: #0d9488; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">
            <span>🛡️</span> Digital Guardian
          </div>
          <p style="font-size: 0.8rem; color: #134e4a; line-height: 1.4;">Your connection is monitored and secured by NexGuard Enterprise Protection.</p>
        </div>
      </aside>

      <main class="academy-content">
        ${content}
      </main>
    </div>

  `
}


// ─── Quiz Category Selector ───────────────────────────────────────────────
function quizCategoryPage() {
  const cats = [
    { id: 'fake-emails', icon: '📧', title: 'Spot Fake Emails & Numbers', desc: 'Identify phishing emails, smishing texts, and fake sender addresses across real-world scenarios.', q: 10, color: '#4F46E5', bg: '#EEF2FF', badge: 'Most Popular' },
    { id: 'dangerous-links', icon: '🔗', title: 'Identify Dangerous Links', desc: 'Spot typosquatting, redirect tricks, shortened URLs, and malicious domains before clicking.', q: 8, color: '#0891B2', bg: '#ECFEFF', badge: 'Intermediate' },
    { id: 'red-flags', icon: '🚩', title: 'Recognize Red Flags', desc: 'Find the subtle warning signs in any message — urgent language, grammar errors, and mismatched branding.', q: 8, color: '#DC2626', bg: '#FEF2F2', badge: 'Advanced' },
    { id: 'right-action', icon: '🛡️', title: 'Take the Right Action', desc: 'Learn exactly what to do — and what NOT to do — when you suspect any phishing attempt.', q: 6, color: '#059669', bg: '#ECFDF5', badge: 'Essential' },
  ]
  return `
    <div class="quiz-category-page">
      <nav style="box-shadow:none;border-bottom:1px solid var(--border);border-radius:0;margin:0;width:100%;max-width:100%;position:sticky;top:0;background:rgba(255,255,255,0.96);backdrop-filter:blur(12px);z-index:100;">
        <div style="display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto;padding:1.25rem 2rem;">
          <a href="/" class="logo" data-link><div class="logo-icon" style="background:var(--primary);">🛡️</div>NexGuard</a>
          <a href="/academy" data-link class="quiz-back-link">← Back to Academy</a>
        </div>
      </nav>

      <div class="quiz-cat-hero">
        <div class="quiz-cat-hero-badge">🎯 Security Quiz Centre</div>
        <h1>Test Your <span>Cyber Awareness</span></h1>
        <p>Choose a category below. Each quiz is based on real-world phishing scenarios to sharpen your instincts.</p>
      </div>

      <div class="quiz-cat-grid-wrapper">
        <div class="quiz-cat-grid">
          ${cats.map(c => `
            <a href="/quiz/${c.id}" class="quiz-cat-card" data-link>
              <div class="quiz-cat-card-top">
                <div class="quiz-cat-icon-wrap" style="background:${c.bg};">${c.icon}</div>
                <span class="quiz-cat-badge" style="background:${c.bg};color:${c.color};">${c.badge}</span>
              </div>
              <h3 class="quiz-cat-card-title">${c.title}</h3>
              <p class="quiz-cat-card-desc">${c.desc}</p>
              <div class="quiz-cat-footer">
                <span class="quiz-cat-meta"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>${c.q} Questions</span>
                <span class="quiz-cat-start-btn" style="color:${c.color};">Start Quiz <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </a>
          `).join('')}
        </div>
        <div class="quiz-cat-tip-bar">
          <span>💡</span>
          <p>Complete the <strong>Learn</strong> section first to boost your quiz scores.</p>
          <a href="/learn" data-link class="quiz-cat-tip-link">Go to Learning →</a>
        </div>
      </div>
    </div>
  `
}

// ═══════════════════════════════════════════════════════════════════════════
// QUIZ ENGINE — 40 Questions across 4 categories
// ═══════════════════════════════════════════════════════════════════════════

const QUIZ_DATA = {
  'fake-emails': {
    icon: '📧', title: 'Spot Fake Emails & Numbers', color: '#4F46E5',
    questions: [
      {
        q: 'Which is the REAL PayPal email?',
        opts: ['support@paypal-secure.com', 'service@paypa1.com', 'service@paypal.com', 'noreply@paypal.co.in'],
        ans: 2,
        exp: '✅ <b>service@paypal.com</b> is official. Watch for hyphens (paypal-secure), number substitution (paypa<b>1</b>), and wrong TLDs (.co.in for a US company).'
      },
      {
        q: 'Which sender is FAKE?',
        opts: ['alerts@hdfcbank.com', 'alerts@hdfc-bank.com', 'netbanking@hdfcbank.com', 'cards@hdfcbank.com'],
        ans: 1,
        exp: '🚨 <b>alerts@hdfc-bank.com</b> is fake. The official HDFC domain is <i>hdfcbank.com</i> — no hyphen. Attackers add hyphens to look legitimate.'
      },
      {
        q: 'Legitimate companies DON\'T use:',
        opts: ['Their own domain', 'Gmail or Yahoo addresses', 'No-reply addresses', 'Official company name'],
        ans: 1,
        exp: '🚨 No real bank or company sends official emails from <b>Gmail or Yahoo</b>. A "Bank Alert" from gmail.com is 100% fake.'
      },
      {
        q: 'Which Amazon email is fake?',
        opts: ['auto-confirm@amazon.in', 'ship-confirm@amazon.in', 'orders@amazon-india.com', 'no-reply@amazon.in'],
        ans: 2,
        exp: '🚨 <b>orders@amazon-india.com</b> is fake. Amazon India\'s real domain is <i>amazon.in</i>. A different root domain is a major red flag.'
      },
      {
        q: 'What\'s wrong with: support@netfIix.com?',
        opts: ['Spelling error', 'Capital "I" instead of lowercase "l"', 'Wrong extension', 'Nothing wrong'],
        ans: 1,
        exp: '🚨 Capital letter <b>I</b> (eye) fakes lowercase <b>l</b> (el). "netfIix" looks identical to "netflix" — always inspect sender addresses character by character.'
      },
      {
        q: 'Which Netflix domain is real?',
        opts: ['netflix.com', 'netflix.co.in', 'netflix.net', 'netflix-india.com'],
        ans: 0,
        exp: '✅ <b>netflix.com</b> is the only real Netflix domain globally. Regional mimics like netflix.co.in or netflix-india.com are scam sites.'
      },
      {
        q: 'Fake email pattern to watch for:',
        opts: ['Company name only', 'Extra words after company name', '"No-reply" in address', 'Numbers in address'],
        ans: 1,
        exp: '🚨 Attackers add words like "support", "secure", or "alerts" — e.g., <i>amazon-support.com</i>. The real domain is always just the company name.'
      },
      {
        q: 'Which ICICI email is legitimate?',
        opts: ['alerts@icici-bank.com', 'alerts@icicibank.com', 'alerts@icici.co.in', 'service@icicibank.net'],
        ans: 1,
        exp: '✅ <b>alerts@icicibank.com</b> is official. Hyphens, wrong TLDs (.net), or shortened versions are all red flags.'
      },
      {
        q: 'Red flag in: support@google.security-check.net?',
        opts: ['Has "security" word', 'Wrong domain (.net instead of .com)', 'Has "support"', 'Too long'],
        ans: 1,
        exp: '🚨 The actual domain is <b>security-check.net</b>, not google.com. Attackers use brand names as subdomains — always read right-to-left from the @.'
      },
      {
        q: 'Real companies use domains like:',
        opts: ['company-name.com', 'companyname.com', 'company.verify.com', 'company.co'],
        ans: 1,
        exp: '✅ Legitimate companies own <b>companyname.com</b> — clean and direct. Anything with hyphens, extra suffixes, or subdomain tricks is suspicious.'
      },
    ]
  },
  'dangerous-links': {
    icon: '🔗', title: 'Identify Dangerous Links', color: '#0891B2',
    questions: [
      {
        q: 'Is this link SAFE or DANGEROUS?\nhttps://www.flipkart.com/offers',
        opts: ['✅ Safe', '🚨 Dangerous'],
        ans: 0,
        exp: '✅ <b>flipkart.com</b> is the legitimate domain with HTTPS. The "/offers" path is a normal section of their website — this link is safe.'
      },
      {
        q: 'Is this link SAFE or DANGEROUS?\nhttp://flipkart-sale.tk/deals',
        opts: ['✅ Safe', '🚨 Dangerous'],
        ans: 1,
        exp: '🚨 Multiple red flags: <b>no HTTPS</b>, hyphen in brand name (flipkart-sale), and the suspicious <b>.tk</b> TLD often misused by scammers.'
      },
      {
        q: 'What\'s wrong with: https://paypa1.com/login?',
        opts: ['No HTTPS', 'Number "1" instead of letter "l"', 'Too short', 'Has "login"'],
        ans: 1,
        exp: '🚨 The domain is <b>paypa1.com</b> — the letter L is replaced with the number 1. This is typosquatting. Always read domains character by character.'
      },
      {
        q: 'Shortened links like bit.ly/xyz123 are:',
        opts: ['Always safe', 'Always dangerous', 'Can\'t verify destination', 'Better than full links'],
        ans: 2,
        exp: '⚠️ Shortened URLs <b>hide the real destination</b>. Use a link expander like checkshorturl.com before visiting any shortened link.'
      },
      {
        q: 'Which part matters most in: secure.paypal.faksite.com?',
        opts: ['secure', 'paypal', 'faksite.com', 'All equal'],
        ans: 2,
        exp: '🚨 The <b>root domain</b> is what matters. Here it\'s <i>faksite.com</i>, not paypal. "secure" and "paypal" are subdomains used to deceive you.'
      },
      {
        q: 'Is this URL SAFE or DANGEROUS?\nhttps://192.168.1.1/banking',
        opts: ['✅ Safe', '🚨 Dangerous — IP instead of domain'],
        ans: 1,
        exp: '🚨 Legitimate banks <b>never use raw IP addresses</b>. IP-based URLs are a classic phishing trick to bypass domain blacklists.'
      },
      {
        q: 'Real Amazon India URL:',
        opts: ['amazon.in', 'amazon.co.in', 'amazon-india.com', 'amaz0n.in'],
        ans: 0,
        exp: '✅ <b>amazon.in</b> is Amazon\'s official India domain. "amaz0n" uses zero instead of O — typosquatting. amazon.co.in is not registered by Amazon.'
      },
      {
        q: 'What makes this dangerous: http://hdfcbank.com?',
        opts: ['Domain name wrong', 'Missing "s" in https', 'Too simple', 'Nothing wrong'],
        ans: 1,
        exp: '🚨 <b>http:// (without S)</b> means no encryption. Your credentials can be intercepted. Always ensure <i>https://</i> with a padlock icon.'
      },
      {
        q: 'Which URL is fake Google?',
        opts: ['accounts.google.com', 'google.com', 'google-accounts.net', 'mail.google.com'],
        ans: 2,
        exp: '🚨 <b>google-accounts.net</b> is fake — the root domain is .net and Google is only in the subdomain. All real Google URLs share the root domain <i>google.com</i>.'
      },
      {
        q: 'To check where a link actually goes:',
        opts: ['Click and see', 'Hover mouse over it', 'Trust the text shown', 'Copy and paste'],
        ans: 1,
        exp: '✅ <b>Hovering</b> over a link shows the real destination in the browser\'s status bar. The visible link text can say anything — the underlying URL is what matters.'
      },
    ]
  },
  'red-flags': {
    icon: '🚩', title: 'Recognize Red Flags', color: '#DC2626',
    questions: [
      {
        q: '"Your account will be closed in 24 hours!" — This is:',
        opts: ['Helpful reminder', 'Urgency tactic', 'Standard notice', 'Good service'],
        ans: 1,
        exp: '🚨 Classic <b>urgency tactic</b>. Attackers create artificial time pressure to make you act without thinking. Real companies give reasonable notice with multiple warnings.'
      },
      {
        q: 'Email starts with "Dear Customer" instead of your name. This is:',
        opts: ['Professional', 'Generic greeting — red flag', 'Privacy protection', 'Normal practice'],
        ans: 1,
        exp: '🚨 <b>Generic greetings</b> like "Dear Customer" are a red flag. Your bank, Amazon, or Google know your real name and use it in every email.'
      },
      {
        q: 'Real banks will NEVER ask for:',
        opts: ['Account number', 'Your OTP via email', 'Branch visit', 'ID verification'],
        ans: 1,
        exp: '🚨 <b>Never share your OTP</b> via email, SMS, or call. Banks explicitly state this. If someone asks for your OTP — it is a 100% guaranteed scam.'
      },
      {
        q: '"Congratulations! You won ₹10 lakh!" is likely:',
        opts: ['Real lottery', 'Too good to be true — scam', 'Promotional offer', 'Reward program'],
        ans: 1,
        exp: '🚨 If you didn\'t enter a lottery, you can\'t win one. <b>Prize scams</b> are designed to excite you into clicking. They then ask for personal info or a "processing fee".'
      },
      {
        q: 'Email has spelling mistakes like "verfiy" or "acount". This means:',
        opts: ['Typing error', 'Unprofessional but safe', 'Likely phishing', 'Translation issue'],
        ans: 2,
        exp: '🚨 Legitimate companies proofread emails. <b>Multiple spelling mistakes</b> signal phishing — scammers work hastily or use automated tools with poor language quality.'
      },
      {
        q: '\"Click immediately or lose access forever\" uses:',
        opts: ['Helpful urgency', 'Fear tactic', 'Standard warning', 'Customer service'],
        ans: 1,
        exp: '🚨 <b>Fear + urgency combined</b>. "Forever" and "immediately" are designed to panic you into clicking. Real services never threaten permanent loss via email.'
      },
      {
        q: 'Email asks you to "reply with your password". You should:',
        opts: ['Reply if urgent', 'Never — it\'s fake', 'Call them first', 'Reply with old password'],
        ans: 1,
        exp: '🚨 <b>No legitimate service ever asks for your password</b> — by email, phone, or chat. This is a guaranteed scam. Never reply with any password, new or old.'
      },
      {
        q: 'Unexpected email with attachment "invoice.exe":',
        opts: ['Open to check', 'Dangerous file type — delete', 'Save for later', 'Forward to others'],
        ans: 1,
        exp: '🚨 An <b>.exe file</b> is an executable program — opening it runs code on your computer. Real invoices are PDFs. A .exe in an unsolicited email is malware — delete immediately.'
      },
      {
        q: '"This is Income Tax Dept. Pay penalty immediately":',
        opts: ['Must comply', 'Authority impersonation scam', 'Verify then pay', 'Government notice'],
        ans: 1,
        exp: '🚨 <b>Authority impersonation</b> is a known scam. Government agencies use registered post — not urgent emails. Verify directly via incometax.gov.in, never via the email link.'
      },
      {
        q: 'Email threatens "legal action" if you don\'t respond:',
        opts: ['Serious — act fast', 'Scare tactic — red flag', 'Standard procedure', 'Lawyer required'],
        ans: 1,
        exp: '🚨 <b>Legal threats via email</b> are scare tactics. Real legal proceedings use registered post and official documents — not mass emails demanding immediate responses.'
      },
    ]
  },
  'right-action': {
    icon: '🛡️', title: 'Take the Right Action', color: '#059669',
    questions: [
      {
        q: 'You receive a suspicious email. Your FIRST action:',
        opts: ['Click to investigate', 'Check sender address', 'Reply asking if real', 'Forward to friends'],
        ans: 1,
        exp: '✅ <b>Check the sender address first</b> — before clicking anything. Look for typosquatting, hyphens, or wrong domains. This prevents most phishing attacks.'
      },
      {
        q: 'Email says "verify account now". You should:',
        opts: ['Click the link', 'Go to official website directly', 'Call number in email', 'Ignore completely'],
        ans: 1,
        exp: '✅ <b>Never use links in suspicious emails.</b> Type the official website manually and log in from there. The phone number in the email may also be fake.'
      },
      {
        q: 'You clicked a phishing link but entered nothing. Now:',
        opts: ['Do nothing', 'Clear browser cache', 'Restart computer', 'Format hard drive'],
        ans: 1,
        exp: '✅ <b>Clear your browser cache</b> to remove tracking cookies or scripts that loaded. Monitor your accounts for unusual activity afterwards.'
      },
      {
        q: 'You entered your password on a fake site. FIRST step:',
        opts: ['Delete the email', 'Change password on real site immediately', 'Wait and watch', 'Tell friends'],
        ans: 1,
        exp: '🚨 <b>Change your password immediately</b> on the real site before attackers do. Also enable 2FA. Accounts can be hijacked within minutes of credential theft.'
      },
      {
        q: 'You shared your OTP with a scammer. Do this NOW:',
        opts: ['Change email', 'Call bank/service immediately', 'Wait for confirmation', 'Deactivate tomorrow'],
        ans: 1,
        exp: '🚨 <b>Call your bank immediately</b> (24/7 helpline). OTPs authenticate transactions — act within minutes. Banks can block suspicious transactions if notified fast.'
      },
      {
        q: 'Money stolen from account after phishing. Call:',
        opts: ['Police station', 'Bank helpline immediately', 'Friends for advice', 'Insurance company'],
        ans: 1,
        exp: '✅ <b>Call the bank helpline first</b> (number on back of your card). They can freeze the account and potentially reverse unauthorized transactions instantly.'
      },
      {
        q: 'To report a phishing email:',
        opts: ['Reply to sender', 'Mark as spam in email client', 'Delete only', 'Print and save'],
        ans: 1,
        exp: '✅ <b>Marking as spam/phishing</b> trains your provider\'s filters to protect others. You can also forward to report@phishing.gov.in — India\'s official report channel.'
      },
      {
        q: 'Received fake "Amazon order" email. Verify by:',
        opts: ['Clicking email link', 'Opening Amazon app directly', 'Replying to ask', 'Calling number in email'],
        ans: 1,
        exp: '✅ <b>Check order status in the official Amazon app</b> or the website typed manually. Real orders always appear there. The email link leads to a fake login page.'
      },
      {
        q: 'Friend forwards "win iPhone" WhatsApp message. You:',
        opts: ['Click to try luck', 'Tell them it\'s a scam', 'Forward to more people', 'Enter details to check'],
        ans: 1,
        exp: '✅ <b>Warn your friend</b> — they may have already been targeted. These messages harvest contacts and sometimes install malware. Never forward, never enter details.'
      },
      {
        q: 'Best way to access your bank account:',
        opts: ['Click email links', 'Type URL directly or use official app', 'Google and click first result', 'Use saved email links'],
        ans: 1,
        exp: '✅ <b>Type the URL manually or bookmark it.</b> Google results can show malicious ads at the top. Official bank apps are safest. Never access banking via email links — ever.'
      },
    ]
  }
}

// ─── Quiz State ──────────────────────────────────────────────────────────
let qState = {
  categoryId: null,
  currentQ: 0,
  selected: null,
  answered: false,
  score: 0,
  started: false,
  finished: false,
}

// ─── Page: Quiz Attempt ──────────────────────────────────────────────────
function quizAttemptPage() {
  const id = window.location.pathname.replace('/quiz/', '') || ''
  if (!QUIZ_DATA[id]) {
    return `<div style="text-align:center;padding:6rem 2rem;"><h2>Quiz not found</h2><a href="/quiz" data-link>← Back</a></div>`
  }
  qState = { categoryId: id, currentQ: 0, selected: null, answered: false, score: 0, started: false, finished: false }
  return renderQuizAttempt()
}

function renderQuizAttempt() {
  const cat = QUIZ_DATA[qState.categoryId]
  const nav = `
    <nav style="box-shadow:none;border-bottom:1px solid var(--border);border-radius:0;margin:0;width:100%;max-width:100%;position:sticky;top:0;background:rgba(255,255,255,0.96);backdrop-filter:blur(12px);z-index:100;">
      <div style="display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto;padding:1rem 2rem;">
        <a href="/" class="logo" data-link>
          <div class="logo-icon" style="background:${cat.color};">${cat.icon}</div>
          NexGuard
        </a>
        <div style="display:flex;align-items:center;gap:1rem;">
          ${qState.started && !qState.finished ? `<span style="font-size:0.85rem;font-weight:600;color:#94a3b8;">Q${qState.currentQ + 1} / ${cat.questions.length}</span>` : ''}
          <a href="/quiz" data-link class="quiz-back-link">← All Quizzes</a>
        </div>
      </div>
    </nav>`

  let body = ''
  if (!qState.started) body = renderQzStart(cat)
  else if (qState.finished) body = renderQzSummary(cat)
  else body = renderQzQuestion(cat)

  return `<div class="quiz-attempt-page">${nav}${body}</div>`
}


function renderQzStart(cat) {
  return `
    <div class="qz-start-screen">
      <div class="qz-start-icon" style="background:${cat.color}12;border:2px solid ${cat.color}30;">${cat.icon}</div>
      <div class="qz-start-badge" style="background:${cat.color}15;color:${cat.color};">Security Quiz</div>
      <h1 class="qz-start-title">${cat.title}</h1>
      <p class="qz-start-desc">Test your ability to ${cat.title.toLowerCase()}. Get instant feedback and detailed explanations for every question.</p>
      <div class="qz-start-stats">
        <div class="qz-stat"><span>${cat.questions.length}</span><label>Questions</label></div>
        <div class="qz-stat"><span>MCQ</span><label>Format</label></div>
        <div class="qz-stat"><span>~5 min</span><label>Duration</label></div>
      </div>
      <button class="qz-start-btn" id="qzStartBtn" style="background:${cat.color};">
        Start Quiz
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>`
}

function renderQzQuestion(cat) {
  const q = cat.questions[qState.currentQ]
  const progress = (qState.currentQ / cat.questions.length) * 100

  const optsHTML = q.opts.map((opt, i) => {
    let cls = 'qz-option'
    if (qState.answered) {
      if (i === q.ans) cls += ' qz-correct'
      else if (i === qState.selected && i !== q.ans) cls += ' qz-wrong'
      else cls += ' qz-dimmed'
    } else if (i === qState.selected) {
      cls += ' qz-selected'
    }
    return `<button class="${cls}" data-opt="${i}" ${qState.answered ? 'disabled' : ''}>
      <span class="qz-opt-letter">${String.fromCharCode(65 + i)}</span>
      <span class="qz-opt-text">${opt}</span>
      ${qState.answered && i === q.ans ? '<span class="qz-check">✓</span>' : ''}
      ${qState.answered && i === qState.selected && i !== q.ans ? '<span class="qz-cross">✗</span>' : ''}
    </button>`
  }).join('')

  const fbHTML = qState.answered ? `
    <div class="qz-feedback ${qState.selected === q.ans ? 'qz-fb-correct' : 'qz-fb-wrong'}">
      <div class="qz-fb-icon">${qState.selected === q.ans ? '✅' : '❌'}</div>
      <div class="qz-fb-body">
        <h4>${qState.selected === q.ans ? 'Correct! Well done.' : 'Not quite right.'}</h4>
        <p>${q.exp}</p>
      </div>
    </div>` : ''

  return `
    <div class="qz-quiz-screen">
      <div class="qz-progress-wrap">
        <div class="qz-progress-bar">
          <div class="qz-progress-fill" style="width:${progress}%;background:${cat.color};"></div>
        </div>
        <div class="qz-progress-labels">
          <span style="color:${cat.color};font-weight:700;">${cat.icon} Question ${qState.currentQ + 1} of ${cat.questions.length}</span>
          <span class="qz-score-badge" style="background:${cat.color}15;color:${cat.color};">Score: ${qState.score} / ${cat.questions.length}</span>
        </div>
      </div>

      <div class="qz-card">
        <h2 class="qz-question" style="${q.q.includes('\n') ? 'white-space:pre-line;' : ''}">${q.q}</h2>
        <div class="qz-options">${optsHTML}</div>
        ${fbHTML}
        ${!qState.answered
      ? `<button class="qz-submit-btn" id="qzSubmitBtn" ${qState.selected === null ? 'disabled' : ''} style="--cat:${cat.color};">Submit Answer</button>`
      : `<button class="qz-next-btn" id="qzNextBtn" style="background:${cat.color};">
               ${qState.currentQ + 1 < cat.questions.length ? 'Next Question →' : 'See Results 🏆'}
             </button>`
    }
      </div>
    </div>`
}

function renderQzSummary(cat) {
  const total = cat.questions.length
  const pct = Math.round((qState.score / total) * 100)
  let emoji = '😓', grade = 'Keep Practicing', msg = 'Review the Learn section to level up your skills.'
  if (pct >= 90) { emoji = '🏆'; grade = 'Expert!'; msg = "Outstanding! You're a certified cybersecurity pro." }
  else if (pct >= 70) { emoji = '🎯'; grade = 'Great Job!'; msg = 'Solid skills. Just a few gaps to fill — you\'re almost there.' }
  else if (pct >= 50) { emoji = '👍'; grade = 'Good Effort'; msg = 'You know the basics. Keep refining your knowledge!' }

  return `
    <div class="qz-summary-screen">
      <div class="qz-summary-emoji">${emoji}</div>
      <div class="qz-summary-grade" style="background:${cat.color}15;color:${cat.color};">${grade}</div>
      <h1 class="qz-summary-title">Quiz Complete!</h1>
      <div class="qz-score-ring" style="border-color:${cat.color}40;">
        <div class="qz-score-ring-inner">
          <span class="qz-ring-num" style="color:${cat.color};">${qState.score}</span>
          <span class="qz-ring-denom">/ ${total}</span>
        </div>
      </div>
      <p class="qz-summary-msg">${msg}</p>
      <div class="qz-summary-stat-row">
        <div class="qz-s-stat" style="background:#DCFCE7;">
          <span style="color:#16a34a;">${qState.score}</span><label>Correct</label>
        </div>
        <div class="qz-s-stat" style="background:#FEE2E2;">
          <span style="color:#dc2626;">${total - qState.score}</span><label>Incorrect</label>
        </div>
        <div class="qz-s-stat" style="background:${cat.color}15;">
          <span style="color:${cat.color};">${pct}%</span><label>Score</label>
        </div>
      </div>
      <div class="qz-summary-actions">
        <button class="qz-retry-btn" id="qzRetryBtn" style="background:${cat.color};">Try Again</button>
        <a href="/quiz" data-link class="qz-all-btn">All Quizzes</a>
      </div>
    </div>`
}

function initQuizAttemptLogic() {
  const $ = id => document.getElementById(id)
  const rerender = () => {
    document.getElementById('app').innerHTML = renderQuizAttempt()
    initQuizAttemptLogic()
  }

  // Start
  const startBtn = $('qzStartBtn')
  if (startBtn) startBtn.addEventListener('click', () => {
    Object.assign(qState, { started: true, currentQ: 0, score: 0, selected: null, answered: false, finished: false })
    rerender()
  })

  // Option selection
  document.querySelectorAll('.qz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (qState.answered) return
      qState.selected = parseInt(btn.dataset.opt)
      document.querySelectorAll('.qz-option').forEach(b => b.classList.remove('qz-selected'))
      btn.classList.add('qz-selected')
      const sub = $('qzSubmitBtn')
      if (sub) sub.disabled = false
    })
  })

  // Submit
  const submitBtn = $('qzSubmitBtn')
  if (submitBtn) submitBtn.addEventListener('click', () => {
    const q = QUIZ_DATA[qState.categoryId].questions[qState.currentQ]
    qState.answered = true
    if (qState.selected === q.ans) qState.score++
    rerender()
  })

  // Next / Finish
  const nextBtn = $('qzNextBtn')
  if (nextBtn) nextBtn.addEventListener('click', () => {
    const total = QUIZ_DATA[qState.categoryId].questions.length
    if (qState.currentQ + 1 < total) {
      qState.currentQ++
      qState.selected = null
      qState.answered = false
    } else {
      qState.finished = true
    }
    rerender()
  })

  // Retry
  const retryBtn = $('qzRetryBtn')
  if (retryBtn) retryBtn.addEventListener('click', () => {
    Object.assign(qState, { currentQ: 0, selected: null, answered: false, score: 0, started: true, finished: false })
    rerender()
  })
}


let learnChapter = 1 // Tracks which chapter is shown


function learnContent() {
  if (learnChapter === 2) return learnChapter2()
  if (learnChapter === 3) return learnChapter3()
  if (learnChapter === 4) return learnChapter4()
  return learnChapter1()
}

function learnChapterNav() {
  return `
    <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1.5rem;">
      Academy &nbsp;›&nbsp; Email Phishing &nbsp;›&nbsp; <strong style="color: var(--text-main);">Chapter ${learnChapter} of 4</strong>
    </div>
    <div class="chapter-nav">
      <button class="chapter-tab ${learnChapter === 1 ? 'active' : ''}" data-chapter="1">📧 Ch 1: Intro</button>
      <button class="chapter-tab ${learnChapter === 2 ? 'active' : ''}" data-chapter="2">🔍 Ch 2: Fake Senders</button>
      <button class="chapter-tab ${learnChapter === 3 ? 'active' : ''}" data-chapter="3">🔗 Ch 3: Dangerous Links</button>
      <button class="chapter-tab ${learnChapter === 4 ? 'active' : ''}" data-chapter="4">🧠 Ch 4: Red Flags</button>
    </div>
  `
}

function learnChapter1() {
  return `
    <div class="lesson-article">
      ${learnChapterNav()}

      <div class="chapter-banner">
        <div>
          <h2>What is <span>Email Phishing?</span></h2>
          <p>Learn how attackers bait you with fake emails — and how to never bite.</p>
        </div>
        <div class="chapter-banner-badge">Chapter 1 of 2</div>
      </div>

      <!-- SECTION: Introduction -->
      <div class="lesson-section-label"><span class="dot"></span> Introduction</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:1rem; letter-spacing:-0.02em;">What Exactly is Email Phishing?</h3>
      <p class="lesson-text">Email phishing is when attackers send fake emails pretending to be trusted companies or people — your bank, Google, Amazon — to steal your passwords, money, or personal data.</p>
      <p class="lesson-text" style="margin-top:-1rem;">Think of it like a fisherman. They throw out <strong>"bait"</strong> (a fake urgent email). If you take it and click or share your info, they've got you. It looks real, it feels urgent — that's by design.</p>

      <div class="callout-box info">
        <div class="cb-icon">💡</div>
        <div class="cb-body">
          <h4>Did You Know?</h4>
          <p>90% of all data breaches start with a phishing email. The average corporate loss from phishing attacks is <strong>$17,700 per minute</strong> globally.</p>
        </div>
      </div>

      <!-- SECTION: How It Works Flow -->
      <div class="lesson-section-label"><span class="dot"></span> How It Works</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">The Attack in 4 Steps</h3>
      <p class="lesson-text">Every phishing attack follows this exact pattern. Hover over each step to learn more.</p>

      <div class="flow-diagram">
        <div class="flow-step">
          <div class="flow-icon-wrap red">
            📧
            <div class="flow-step-num">1</div>
          </div>
          <h4>Fake Email Sent</h4>
          <p>"Your account is suspended! Act now."</p>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="flow-icon-wrap amber">
            👆
            <div class="flow-step-num">2</div>
          </div>
          <h4>You Click the Link</h4>
          <p>Lands on a near-perfect copy of your bank's login page</p>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="flow-icon-wrap violet">
            🔑
            <div class="flow-step-num">3</div>
          </div>
          <h4>You Enter Password</h4>
          <p>Attacker silently captures every keystroke in real-time</p>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="flow-icon-wrap danger">
            💸
            <div class="flow-step-num">4</div>
          </div>
          <h4>Account Compromised</h4>
          <p>Money stolen, data sold, account hijacked within minutes</p>
        </div>
      </div>

      <!-- SECTION: Types of Email Phishing -->
      <div class="lesson-section-label"><span class="dot"></span> Types</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">4 Variants of Email Phishing</h3>
      <p class="lesson-text">Not every phishing attack is the same. Click each type to expand and explore.</p>

      <div class="accordion-list" id="phishingAccordion">

        <div class="accordion-item" id="acc-1">
          <button class="accordion-trigger" data-acc="acc-1">
            <div class="accordion-trigger-left">
              <div class="accordion-type-icon" style="background:#EEF2FF;">🎯</div>
              <div>
                <h4>Spear Phishing</h4>
                <p>Targeted attack using your real personal details</p>
              </div>
            </div>
            <div class="accordion-chevron">▼</div>
          </button>
          <div class="accordion-body">
            <div class="accordion-body-inner">
              <div class="accordion-detail-box">
                <label>How It Works</label>
                <p>Attackers research their target on LinkedIn or social media, then craft a personalized email using your real name, company, and role to make it incredibly believable.</p>
              </div>
              <div class="accordion-detail-box">
                <label>Real Example</label>
                <p>"Hi Rahul, your Q4 project deadline has been moved. Please review the updated document from HR."<br><span class="accordion-example-pill">from: hr@your-company-corp.net</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion-item" id="acc-2">
          <button class="accordion-trigger" data-acc="acc-2">
            <div class="accordion-trigger-left">
              <div class="accordion-type-icon" style="background:#F0FDF4;">🧬</div>
              <div>
                <h4>Clone Phishing</h4>
                <p>An exact copy of a real email you already received</p>
              </div>
            </div>
            <div class="accordion-chevron">▼</div>
          </button>
          <div class="accordion-body">
            <div class="accordion-body-inner">
              <div class="accordion-detail-box">
                <label>How It Works</label>
                <p>Attacker finds a real email you received (like an Amazon order receipt) and resends an identical copy — with one change: the link now points to a fake site that steals your login.</p>
              </div>
              <div class="accordion-detail-box">
                <label>Real Example</label>
                <p>You get a second Amazon order confirmation email — same formatting, same subject — but clicking "Track Package" now goes to <span class="accordion-example-pill">amazon-orders.delivery-info.biz</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion-item" id="acc-3">
          <button class="accordion-trigger" data-acc="acc-3">
            <div class="accordion-trigger-left">
              <div class="accordion-type-icon" style="background:#FFF7ED;">🐋</div>
              <div>
                <h4>Whaling</h4>
                <p>Targets CEOs, CFOs, and high-value executives</p>
              </div>
            </div>
            <div class="accordion-chevron">▼</div>
          </button>
          <div class="accordion-body">
            <div class="accordion-body-inner">
              <div class="accordion-detail-box">
                <label>How It Works</label>
                <p>Attackers go "big game hunting" — targeting C-suite executives. These emails are highly sophisticated, often referencing real business deals, and request large wire transfers or sensitive data.</p>
              </div>
              <div class="accordion-detail-box">
                <label>Real Example</label>
                <p>"As discussed on the call, please wire ₹50L to the new vendor account before 5pm today. Do not go through normal channels."<br><span class="accordion-example-pill">Sent to: CFO from fake CEO email</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion-item" id="acc-4">
          <button class="accordion-trigger" data-acc="acc-4">
            <div class="accordion-trigger-left">
              <div class="accordion-type-icon" style="background:#FEF2F2;">🏢</div>
              <div>
                <h4>Business Email Compromise (BEC)</h4>
                <p>Impersonates your boss or a colleague internally</p>
              </div>
            </div>
            <div class="accordion-chevron">▼</div>
          </button>
          <div class="accordion-body">
            <div class="accordion-body-inner">
              <div class="accordion-detail-box">
                <label>How It Works</label>
                <p>The attacker compromises or spoofs an email from inside your organization — like your manager or finance team — to authorize payments, share credentials, or install malware.</p>
              </div>
              <div class="accordion-detail-box">
                <label>Real Example</label>
                <p>"Hey, please process this invoice for our new supplier by EOD. I'm in meetings all day."<br><span class="accordion-example-pill">from: boss@company-corp.net</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- SECTION: Why It Works -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Psychology</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">Why Phishing Actually Works</h3>
      <p class="lesson-text">It's not about being dumb — it's about being human. Phishing attackers are expert psychologists.</p>

      <div class="why-it-works-grid">
        <div class="why-card">
          <div class="why-icon" style="background:#EEF2FF;">🎨</div>
          <div>
            <h4>Looks 100% Real</h4>
            <p>Logos, fonts, email formatting — all copied precisely from real brand assets to bypass your visual trust signals.</p>
          </div>
        </div>
        <div class="why-card">
          <div class="why-icon" style="background:#FEF2F2;">⏰</div>
          <div>
            <h4>Creates Extreme Urgency</h4>
            <p>"Act now or lose access in 2 hours!" Panic bypasses rational thinking and makes you click without verifying.</p>
          </div>
        </div>
        <div class="why-card">
          <div class="why-icon" style="background:#F0FDF4;">🤝</div>
          <div>
            <h4>Exploits Trust</h4>
            <p>Pretends to be your bank, Google, or your own boss. You trust them, so you trust the email — a fatal assumption.</p>
          </div>
        </div>
        <div class="why-card">
          <div class="why-icon" style="background:#FFFBEB;">😨</div>
          <div>
            <h4>Uses Fear & Threats</h4>
            <p>"Your account will be permanently deleted." Fear of loss is one of the most powerful psychological triggers used by attackers.</p>
          </div>
        </div>
      </div>

      <div class="callout-box tip" style="margin-top:3rem;">
        <div class="cb-icon">✅</div>
        <div class="cb-body">
          <h4>Chapter 1 Complete!</h4>
          <p>You now understand what phishing is, how it works, and the psychology behind it. Ready to learn how to spot a fake email address? Move to Chapter 2.</p>
        </div>
      </div>

      <div style="margin-top:2rem; display:flex; justify-content:flex-end;">
        <button class="chapter-tab active" style="border:none; padding:0.9rem 2rem; border-radius:100px; background:var(--primary); color:white; font-size:0.95rem; font-weight:700; cursor:pointer;" data-chapter="2">
          Chapter 2: Fake Sender Addresses →
        </button>
      </div>

    </div>
  `
}

function learnChapter2() {
  return `
    <div class="lesson-article">
      ${learnChapterNav()}

      <div class="chapter-banner">
        <div>
          <h2>Detecting <span>Fake Senders</span></h2>
          <p>Master the art of reading email addresses like a cybersecurity expert.</p>
        </div>
        <div class="chapter-banner-badge">Chapter 2 of 2</div>
      </div>

      <!-- SECTION: The Trick -->
      <div class="lesson-section-label"><span class="dot"></span> Core Concept</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:1rem; letter-spacing:-0.02em;">The Attacker's Primary Trick</h3>
      <p class="lesson-text">The sender name can say anything — "PayPal Support", "Your Bank", "Google Security." But the actual <em>email address</em> tells the truth. Attackers make addresses look real with tiny, easy-to-miss changes.</p>

      <div class="callout-box warn">
        <div class="cb-icon">⚠️</div>
        <div class="cb-body">
          <h4>Key Rule: Never Trust the Display Name</h4>
          <p>Anyone can name their email "Apple Support" or "HDFC Bank Alerts." Always expand and verify the actual email address domain — the part after the @ symbol.</p>
        </div>
      </div>

      <!-- SECTION: Interactive Hover Examples -->
      <div class="lesson-section-label"><span class="dot"></span> Interactive</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">Hover to Inspect These Addresses</h3>
      <p class="lesson-text">Can you spot the difference? Hover each card to reveal the verdict and why.</p>

      <div class="interactive-email-list">

        <div class="hover-email-card">
          <div class="email-from-wrap">
            <span class="email-from-label">FROM</span>
            <span class="email-from-address">support@netflix.com</span>
          </div>
          <div class="email-verdict safe">✅ Legitimate</div>
          <div class="email-verdict-tooltip">✅ Real Netflix domain. The company owns netflix.com</div>
        </div>

        <div class="hover-email-card">
          <div class="email-from-wrap">
            <span class="email-from-label">FROM</span>
            <span class="email-from-address">support@netflix-<mark>verify</mark>.com</span>
          </div>
          <div class="email-verdict danger">🚨 Fake!</div>
          <div class="email-verdict-tooltip">🚨 Netflix does NOT use subdomains or added words like 'verify'</div>
        </div>

        <div class="hover-email-card">
          <div class="email-from-wrap">
            <span class="email-from-label">FROM</span>
            <span class="email-from-address">support@net<mark>f</mark><mark>I</mark>ix.com</span>
          </div>
          <div class="email-verdict danger">🚨 Lookalike!</div>
          <div class="email-verdict-tooltip">🚨 Capital letter "I" used instead of lowercase "l" — classic typosquatting</div>
        </div>

        <div class="hover-email-card">
          <div class="email-from-wrap">
            <span class="email-from-label">FROM</span>
            <span class="email-from-address">no-reply@amazon.<mark>co.in</mark></span>
          </div>
          <div class="email-verdict warning">⚠️ Suspicious</div>
          <div class="email-verdict-tooltip">⚠️ Real Amazon India is @amazon.in — the .co. prefix is fake</div>
        </div>

        <div class="hover-email-card">
          <div class="email-from-wrap">
            <span class="email-from-label">FROM</span>
            <span class="email-from-address">alerts@hdfcbank.com</span>
          </div>
          <div class="email-verdict safe">✅ Legitimate</div>
          <div class="email-verdict-tooltip">✅ hdfcbank.com is HDFC's genuine registered domain</div>
        </div>

        <div class="hover-email-card">
          <div class="email-from-wrap">
            <span class="email-from-label">FROM</span>
            <span class="email-from-address">alerts@hdfc-<mark>bank</mark>.<mark>co.in</mark></span>
          </div>
          <div class="email-verdict danger">🚨 Fake!</div>
          <div class="email-verdict-tooltip">🚨 Added words + wrong country code. Real domain: hdfcbank.com</div>
        </div>

      </div>

      <!-- SECTION: Visual Annotation Guide -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Visual Guide</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">How to Check a Sender: Step-by-Step</h3>
      <p class="lesson-text">Open your email app and follow these 3 checks before clicking <em>anything</em>.</p>

      <div class="annotation-card">
        <div class="annotation-header">
          <div class="annotation-header-dots">
            <span style="background:#FF5F57;"></span>
            <span style="background:#FEBC2E;"></span>
            <span style="background:#28C840;"></span>
          </div>
          <span class="annotation-title">email_inspection_guide.exe — NexGuard Analyzer</span>
        </div>
        <div class="annotation-body">

          <p style="font-size:0.82rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:1rem;">Step 1 — Check the domain (part after @)</p>
          <div class="annotation-email-row correct">
            <span class="ann-badge real">REAL</span>
            <span class="domain">alerts@<strong>hdfcbank.com</strong></span>
            <span class="ann-reason">✅ Official domain, no extras</span>
          </div>
          <div class="annotation-email-row flagged">
            <span class="ann-badge fake">FAKE</span>
            <span class="domain">alerts@<em>hdfc-bank.co.in</em></span>
            <span class="ann-reason">❌ Added word + wrong extension</span>
          </div>

          <p style="font-size:0.82rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.07em; margin:1.5rem 0 1rem;">Step 2 — Look for lookalike characters</p>
          <div class="annotation-email-row correct">
            <span class="ann-badge real">REAL</span>
            <span class="domain">service@<strong>paypal.com</strong></span>
            <span class="ann-reason">✅ Lowercase L is correct</span>
          </div>
          <div class="annotation-email-row flagged">
            <span class="ann-badge fake">FAKE</span>
            <span class="domain">service@paypa<em>1</em>.com</span>
            <span class="ann-reason">❌ Number 1 replacing letter l</span>
          </div>
          <div class="annotation-email-row flagged">
            <span class="ann-badge fake">FAKE</span>
            <span class="domain">service@paypa<em>I</em>.com</span>
            <span class="ann-reason">❌ Capital I replacing letter l</span>
          </div>

          <p style="font-size:0.82rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.07em; margin:1.5rem 0 1rem;">Step 3 — Real companies never use free email services</p>
          <div class="annotation-email-row flagged">
            <span class="ann-badge fake">FAKE</span>
            <span class="domain"><em>support-hdfc@gmail.com</em></span>
            <span class="ann-reason">❌ Banks don't use @gmail</span>
          </div>
          <div class="annotation-email-row flagged">
            <span class="ann-badge fake">FAKE</span>
            <span class="domain"><em>amazon.help@yahoo.com</em></span>
            <span class="ann-reason">❌ Amazon never uses @yahoo</span>
          </div>

        </div>
      </div>

      <!-- SECTION: Real vs Fake Comparison Table -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Comparison</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">Real vs Fake: Side-by-Side</h3>
      <p class="lesson-text">Memorize these patterns. They appear in millions of attack emails every day.</p>

      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th class="real">✅ Real Email Address</th>
              <th class="fake">🚨 Fake Email Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HDFC Bank</td>
              <td class="cell-real">alerts@hdfcbank.com</td>
              <td class="cell-fake">alerts@hdfc-bank.co.in</td>
            </tr>
            <tr>
              <td>Amazon</td>
              <td class="cell-real">no-reply@amazon.in</td>
              <td class="cell-fake">no-reply@amazon-india.com</td>
            </tr>
            <tr>
              <td>Google</td>
              <td class="cell-real">noreply@google.com</td>
              <td class="cell-fake">noreply@google-security.net</td>
            </tr>
            <tr>
              <td>PayPal</td>
              <td class="cell-real">service@paypal.com</td>
              <td class="cell-fake">service@paypa1.com</td>
            </tr>
            <tr>
              <td>SBI</td>
              <td class="cell-real">alerts@sbi.co.in</td>
              <td class="cell-fake">alerts@sbi-bank-secure.com</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- SECTION: Pattern Recognition -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Patterns</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">4 Fake Address Patterns to Memorize</h3>
      <p class="lesson-text">These are the 4 tricks attackers use over and over. Learn them once, spot them forever.</p>

      <div class="pattern-grid">

        <div class="pattern-card">
          <div class="pattern-card-header">
            <div class="pattern-num">1</div>
            <h4>Added Words to Domain</h4>
          </div>
          <div class="pattern-examples">
            <div class="pattern-row">
              <span class="pr-label ok">REAL</span>
              <span class="pr-val ok">@bank.com</span>
            </div>
            <div class="pattern-divider"></div>
            <div class="pattern-row">
              <span class="pr-label bad">FAKE</span>
              <span class="pr-val bad">@bank-security.com</span>
            </div>
            <div class="pattern-row">
              <span class="pr-label bad">FAKE</span>
              <span class="pr-val bad">@bank-verify.net</span>
            </div>
          </div>
          <div class="pattern-note">Legit brands never add words like "secure," "verify," or "support" to their main domain.</div>
        </div>

        <div class="pattern-card">
          <div class="pattern-card-header">
            <div class="pattern-num">2</div>
            <h4>Lookalike Characters</h4>
          </div>
          <div class="pattern-examples">
            <div class="pattern-row">
              <span class="pr-label ok">REAL</span>
              <span class="pr-val ok">@paypal.com (letter l)</span>
            </div>
            <div class="pattern-divider"></div>
            <div class="pattern-row">
              <span class="pr-label bad">FAKE</span>
              <span class="pr-val bad">@paypa1.com (number 1)</span>
            </div>
            <div class="pattern-row">
              <span class="pr-label bad">FAKE</span>
              <span class="pr-val bad">@paypaI.com (capital I)</span>
            </div>
          </div>
          <div class="pattern-note">Always zoom in and read domains character-by-character for 1/l/I and 0/O confusion.</div>
        </div>

        <div class="pattern-card">
          <div class="pattern-card-header">
            <div class="pattern-num">3</div>
            <h4>Wrong Country Code (TLD)</h4>
          </div>
          <div class="pattern-examples">
            <div class="pattern-row">
              <span class="pr-label ok">REAL</span>
              <span class="pr-val ok">@amazon.in (India)</span>
            </div>
            <div class="pattern-divider"></div>
            <div class="pattern-row">
              <span class="pr-label bad">FAKE</span>
              <span class="pr-val bad">@amazon.co.in</span>
            </div>
            <div class="pattern-row">
              <span class="pr-label bad">FAKE</span>
              <span class="pr-val bad">@amazon.net</span>
            </div>
          </div>
          <div class="pattern-note">Know your brand's exact country-level domain. Amazon India is amazon.in, not amazon.co.in.</div>
        </div>

        <div class="pattern-card">
          <div class="pattern-card-header">
            <div class="pattern-num">4</div>
            <h4>Free Email Services</h4>
          </div>
          <div class="pattern-examples">
            <div class="pattern-row">
              <span class="pr-label ok">REAL</span>
              <span class="pr-val ok">@hdfcbank.com</span>
            </div>
            <div class="pattern-divider"></div>
            <div class="pattern-row">
              <span class="pr-label bad">FAKE</span>
              <span class="pr-val bad">hdfc-support@gmail.com</span>
            </div>
            <div class="pattern-row">
              <span class="pr-label bad">FAKE</span>
              <span class="pr-val bad">amazon.help@yahoo.com</span>
            </div>
          </div>
          <div class="pattern-note">No bank, tech company, or retailer will contact you from @gmail, @yahoo or @hotmail.</div>
        </div>

      </div>

      <div class="callout-box tip" style="margin-top:3rem;">
        <div class="cb-icon">🎓</div>
        <div class="cb-body">
          <h4>Chapter 2 Complete!</h4>
          <p>You can now spot a fake email address like a pro. Continue to Chapter 3 to learn how to detect dangerous links hidden inside phishing emails.</p>
        </div>
      </div>

      <div class="chapter-footer-nav">
        <button class="btn-chapter-nav prev" data-chapter="1">← Chapter 1</button>
        <button class="btn-chapter-menu" onclick="learnChapter=1; navigate('/learn')"><span>☰</span>Chapter Menu</button>
        <button class="btn-chapter-nav next" data-chapter="3">Chapter 3: Dangerous Links →</button>
      </div>

    </div>
  `
}

function learnChapter3() {
  return `
    <div class="lesson-article">
      ${learnChapterNav()}

      <div class="chapter-banner">
        <div>
          <h2>Dangerous <span>Links in Emails</span></h2>
          <p>Learn to detect deceptive URLs before they steal your credentials.</p>
        </div>
        <div class="chapter-banner-badge">Chapter 3 of 4</div>
      </div>

      <!-- SECTION: The Trap -->
      <div class="lesson-section-label"><span class="dot"></span> The Trap</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:1rem; letter-spacing:-0.02em;">The Link Text Is a Lie</h3>
      <p class="lesson-text">Links in phishing emails look safe — they display a real-looking website name — but secretly point to a completely different malicious URL. Your eyes see one thing; the browser goes somewhere else.</p>

      <div class="url-trap-card">
        <div class="url-trap-header">
          <span style="font-size:1.2rem;">⚠️</span>
          <span class="trap-label">Key Concept: What You See ≠ Where You Go</span>
        </div>
        <div class="url-eq-row">
          <div class="url-eq-item">
            <label>What you see</label>
            <div class="url-val">"Click here: paypal.com"</div>
          </div>
          <div class="url-neq-sym">≠</div>
          <div class="url-eq-item">
            <label>Where it actually goes</label>
            <div class="url-val danger"><em>http://paypa1-login.net/verify</em></div>
          </div>
        </div>
      </div>

      <div class="callout-box warn">
        <div class="cb-icon">⚠️</div>
        <div class="cb-body">
          <h4>Never Judge a Link by Its Display Text</h4>
          <p>The blue hyperlinked text in an email can say <strong>anything</strong>. The only way to know where it really goes is to hover over it first — never click without checking.</p>
        </div>
      </div>

      <!-- SECTION: How to Check -->
      <div class="lesson-section-label"><span class="dot"></span> Step-by-Step</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">How to Check Any Link (Before Clicking)</h3>
      <p class="lesson-text">Follow these 3 steps every single time you see a link in an email.</p>

      <div class="step-guide-list">
        <div class="step-guide-card">
          <div class="step-num-badge">1</div>
          <div>
            <h4>DON'T CLICK — Hover your mouse over the link</h4>
            <p>Move your cursor on top of the link text without clicking it. Your mouse pointer will change to a hand icon. Wait a moment.</p>
            <div class="step-tip">🖱️ On mobile: Long-press the link to preview the URL</div>
          </div>
        </div>
        <div class="step-guide-card">
          <div class="step-num-badge">2</div>
          <div>
            <h4>Look at the bottom-left corner of your screen</h4>
            <p>Your browser will display the <strong>actual destination URL</strong> in a small status bar at the very bottom-left. This is the real address the link points to.</p>
            <div class="step-tip">📌 In Gmail: The real URL also appears as a popup near your cursor</div>
          </div>
        </div>
        <div class="step-guide-card">
          <div class="step-num-badge">3</div>
          <div>
            <h4>Check if the shown text matches the real URL domain</h4>
            <p>If the link says <code style="background:#F1F5F9; padding:2px 6px; border-radius:4px; font-family:monospace;">paypal.com</code> but the real URL goes to <code style="background:#FEF2F2; color:#DC2626; padding:2px 6px; border-radius:4px; font-family:monospace;">paypa1-login.net</code> — that's a phishing link. Don't click it.</p>
            <div class="step-tip">✅ Rule: Domain in display text must exactly match domain in real URL</div>
          </div>
        </div>
      </div>

      <!-- SECTION: Interactive Link Reveal -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Interactive</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">Click to Reveal the Real URL</h3>
      <p class="lesson-text">These look like normal email links. What do they actually lead to? Click "Reveal URL" on each one to find out.</p>

      <div class="link-reveal-list">

        <div class="link-reveal-card" id="lrc-1">
          <div class="link-reveal-top">
            <span class="link-display-text">Verify your Amazon account</span>
            <button class="btn-reveal" data-lrc="lrc-1">🔍 Reveal URL</button>
          </div>
          <div class="link-reveal-bottom">
            <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.07em; color:var(--text-muted);">Real Destination</span>
            <div class="link-real-url danger">http://amazon-verify-account.tk/login</div>
            <div class="link-analysis danger">🚨 .tk is a suspicious free domain — Amazon never uses it. This is phishing.</div>
          </div>
        </div>

        <div class="link-reveal-card" id="lrc-2">
          <div class="link-reveal-top">
            <span class="link-display-text">Reset Password: netflix.com</span>
            <button class="btn-reveal" data-lrc="lrc-2">🔍 Reveal URL</button>
          </div>
          <div class="link-reveal-bottom">
            <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.07em; color:var(--text-muted);">Real Destination</span>
            <div class="link-real-url danger">https://netflix.security-check.ru/reset</div>
            <div class="link-analysis danger">🚨 The real domain is security-check.ru (Russia), not netflix.com</div>
          </div>
        </div>

        <div class="link-reveal-card" id="lrc-3">
          <div class="link-reveal-top">
            <span class="link-display-text">HDFC Net Banking — Secure Login</span>
            <button class="btn-reveal" data-lrc="lrc-3">🔍 Reveal URL</button>
          </div>
          <div class="link-reveal-bottom">
            <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.07em; color:var(--text-muted);">Real Destination</span>
            <div class="link-real-url safe">https://www.hdfcbank.com/netbanking</div>
            <div class="link-analysis safe">✅ Correct! This is HDFC's genuine official domain. Safe to proceed.</div>
          </div>
        </div>

      </div>

      <!-- SECTION: URL Red Flags Accordion -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Red Flags</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">6 URL Red Flags to Memorize</h3>
      <p class="lesson-text">Even without hovering, these URL patterns are instant giveaways. Click each to learn why it's dangerous.</p>

      <div class="redflag-list" id="redflagAccordion">

        <div class="redflag-item" id="rf-1">
          <button class="redflag-trigger" data-rf="rf-1">
            <div class="redflag-trigger-left">
              <span class="redflag-flag-icon">🚩</span>
              <div><h4>Shortened Links</h4><p class="rf-sub">bit.ly, tinyurl, goo.gl — hides the real destination</p></div>
            </div>
            <div class="redflag-chevron">▼</div>
          </button>
          <div class="redflag-body">
            <div class="redflag-body-inner">
              <div class="redflag-examples">
                <code>bit.ly/abc123</code>
                <code>tinyurl.com/xyz789</code>
                <code>goo.gl/def456</code>
              </div>
              <div class="redflag-why"><strong>Why dangerous:</strong> You can't see where the link actually goes. Attackers use these to hide fake domain names completely. <span class="annotation-label-note">Exception: Official company social media posts</span></div>
            </div>
          </div>
        </div>

        <div class="redflag-item" id="rf-2">
          <button class="redflag-trigger" data-rf="rf-2">
            <div class="redflag-trigger-left">
              <span class="redflag-flag-icon">🚩</span>
              <div><h4>IP Addresses Instead of Domain Names</h4><p class="rf-sub">Numbers instead of words — never from a real company</p></div>
            </div>
            <div class="redflag-chevron">▼</div>
          </button>
          <div class="redflag-body">
            <div class="redflag-body-inner">
              <div class="redflag-examples">
                <code>http://192.168.1.1/login</code>
                <code>http://103.21.58.64/verify</code>
              </div>
              <div class="redflag-why"><strong>Why dangerous:</strong> Real companies like Google, PayPal, and HDFC always use domain names (google.com). If you see a raw IP address in a link, it's 100% suspicious.</div>
            </div>
          </div>
        </div>

        <div class="redflag-item" id="rf-3">
          <button class="redflag-trigger" data-rf="rf-3">
            <div class="redflag-trigger-left">
              <span class="redflag-flag-icon">🚩</span>
              <div><h4>Too Many Subdomains</h4><p class="rf-sub">secure.login.verify.paypal.fakesite.com</p></div>
            </div>
            <div class="redflag-chevron">▼</div>
          </button>
          <div class="redflag-body">
            <div class="redflag-body-inner">
              <div class="redflag-examples">
                <code>secure.login.verify.paypal.fakesite.com</code>
              </div>
              <div class="redflag-why"><strong>Only the last two parts matter:</strong> The real domain is <code style="background:rgba(220,38,38,0.1); padding:2px 5px; border-radius:4px;">fakesite.com</code> — everything before the last dot-separated pair is just a subdomain. The word "paypal" there means nothing.</div>
            </div>
          </div>
        </div>

        <div class="redflag-item" id="rf-4">
          <button class="redflag-trigger" data-rf="rf-4">
            <div class="redflag-trigger-left">
              <span class="redflag-flag-icon">🚩</span>
              <div><h4>Misspellings in the URL</h4><p class="rf-sub">Characters swapped with visually similar ones</p></div>
            </div>
            <div class="redflag-chevron">▼</div>
          </button>
          <div class="redflag-body">
            <div class="redflag-body-inner">
              <div class="redflag-examples">
                <code>paypa1.com  (1 instead of l)</code>
                <code>amaz0n.com  (0 instead of o)</code>
                <code>g00gle.com  (zeros instead of o's)</code>
              </div>
              <div class="redflag-why"><strong>Classic typosquatting:</strong> Attackers register near-identical domains with swapped characters. Always zoom in and read the domain letter by letter.</div>
            </div>
          </div>
        </div>

        <div class="redflag-item" id="rf-5">
          <button class="redflag-trigger" data-rf="rf-5">
            <div class="redflag-trigger-left">
              <span class="redflag-flag-icon">🚩</span>
              <div><h4>HTTP Without the "S"</h4><p class="rf-sub">No encryption — your data is sent in plain text</p></div>
            </div>
            <div class="redflag-chevron">▼</div>
          </button>
          <div class="redflag-body">
            <div class="redflag-body-inner">
              <div class="redflag-examples">
                <code>http://paypal.com  ❌ (NO S = not encrypted)</code>
                <code>https://paypal.com  ✅ (S = Secure)</code>
              </div>
              <div class="redflag-why"><strong>The "S" in HTTPS means Secure.</strong> All real login pages always use HTTPS. If a payment or login page uses plain HTTP, it's fake or compromised.</div>
            </div>
          </div>
        </div>

        <div class="redflag-item" id="rf-6">
          <button class="redflag-trigger" data-rf="rf-6">
            <div class="redflag-trigger-left">
              <span class="redflag-flag-icon">🚩</span>
              <div><h4>Suspicious Domain Extensions</h4><p class="rf-sub">.tk, .ml, .ga, .cf, .ru — common in phishing</p></div>
            </div>
            <div class="redflag-chevron">▼</div>
          </button>
          <div class="redflag-body">
            <div class="redflag-body-inner">
              <div class="redflag-examples">
                <code>Suspicious: .tk  .ml  .ga  .cf  .ru  .cn  .xyz</code>
                <code>Safe (from known brands): .com  .in  .org  .net</code>
              </div>
              <div class="redflag-why"><strong>Why:</strong> .tk and similar domains are free to register — attackers use them massively because they cost nothing. Major brands always use .com, .in, or official country extensions.</div>
            </div>
          </div>
        </div>

      </div>

      <!-- SECTION: URL Comparison Cards -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Real vs Fake</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">Real vs Fake URLs: Side-by-Side</h3>
      <p class="lesson-text">Study these real examples. These exact URLs have appeared in Indian phishing campaigns.</p>

      <div class="url-compare-grid">
        <div class="url-compare-card">
          <div class="url-compare-brand hdfc">🏦 HDFC Bank</div>
          <div class="url-compare-rows">
            <div class="url-row"><span class="ur-badge real">REAL</span><span class="ur-val real">https://netbanking.hdfcbank.com</span></div>
            <div class="url-row"><span class="ur-badge fake">FAKE</span><span class="ur-val fake">http://hdfc-netbanking.co.in</span></div>
            <div class="url-row"><span class="ur-badge fake">FAKE</span><span class="ur-val fake">https://hdfcbank.secure-login.net</span></div>
          </div>
        </div>
        <div class="url-compare-card">
          <div class="url-compare-brand amazon">📦 Amazon India</div>
          <div class="url-compare-rows">
            <div class="url-row"><span class="ur-badge real">REAL</span><span class="ur-val real">https://www.amazon.in</span></div>
            <div class="url-row"><span class="ur-badge fake">FAKE</span><span class="ur-val fake">https://amazon-india.co</span></div>
            <div class="url-row"><span class="ur-badge fake">FAKE</span><span class="ur-val fake">https://www.amaz0n.in</span></div>
          </div>
        </div>
        <div class="url-compare-card">
          <div class="url-compare-brand google">🔍 Google</div>
          <div class="url-compare-rows">
            <div class="url-row"><span class="ur-badge real">REAL</span><span class="ur-val real">https://accounts.google.com</span></div>
            <div class="url-row"><span class="ur-badge fake">FAKE</span><span class="ur-val fake">https://google-accounts-verify.com</span></div>
            <div class="url-row"><span class="ur-badge fake">FAKE</span><span class="ur-val fake">http://accounts-google.net</span></div>
          </div>
        </div>
      </div>

      <div class="callout-box tip" style="margin-top:3rem;">
        <div class="cb-icon">✅</div>
        <div class="cb-body">
          <h4>Chapter 3 Complete!</h4>
          <p>You now know how to inspect links safely and spot every URL red flag. The final chapter covers the psychological tricks attackers use to manipulate you.</p>
        </div>
      </div>

      <div class="chapter-footer-nav">
        <button class="btn-chapter-nav prev" data-chapter="2">← Chapter 2</button>
        <button class="btn-chapter-menu"><span>☰</span>Chapter Menu</button>
        <button class="btn-chapter-nav next" data-chapter="4">Chapter 4: Red Flags →</button>
      </div>

    </div>
  `
}

function learnChapter4() {
  return `
    <div class="lesson-article">
      ${learnChapterNav()}

      <div class="chapter-banner">
        <div>
          <h2>Red Flags &amp; <span>Manipulation Tactics</span></h2>
          <p>Understand the psychological tricks attackers use — so you never fall for them.</p>
        </div>
        <div class="chapter-banner-badge">Chapter 4 of 4</div>
      </div>

      <!-- SECTION: Tactics -->
      <div class="lesson-section-label"><span class="dot"></span> Psychology</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">5 Psychological Tricks Attackers Use</h3>
      <p class="lesson-text">Phishing isn't a technology problem — it's a <em>psychology</em> problem. Here's exactly how attackers manipulate your brain.</p>

      <!-- Tactic 1: Urgency -->
      <div class="tactic-section">
        <div class="tactic-header">
          <div class="tactic-num">1</div>
          <h3>Urgency — Make You Panic &amp; Act Fast</h3>
        </div>
        <div class="tactic-two-col">
          <div class="tactic-example-box phish">
            <span class="teb-label">🚨 Phishing Email Says</span>
            <div class="tactic-quote">"Your account will be closed in 24 hours!"<br>"Immediate action required"<br>"Verify NOW or lose access permanently"</div>
            <p class="tactic-example-more">Everything is URGENT, IMMEDIATE, LAST CHANCE</p>
          </div>
          <div class="tactic-example-box real">
            <span class="teb-label">✅ Real Company Email Says</span>
            <div class="tactic-quote">"Please update your information at your convenience"<br>"Your subscription renews on March 15"</div>
            <p class="tactic-example-more">Real companies give you time. They don't threaten.</p>
          </div>
        </div>
        <div class="tactic-why-note">
          <div class="twn-icon">🧠</div>
          <p><strong>Why it works:</strong> Panic bypasses your rational thinking. When scared of losing something, you stop verifying and just act. <strong>Rule:</strong> If an email makes you panic, slow down and verify.</p>
        </div>
      </div>

      <!-- Tactic 2: Fear -->
      <div class="tactic-section">
        <div class="tactic-header">
          <div class="tactic-num">2</div>
          <h3>Fear — Threaten You with Bad Consequences</h3>
        </div>
        <div class="tactic-two-col">
          <div class="tactic-example-box phish">
            <span class="teb-label">🚨 Phishing Email Says</span>
            <div class="tactic-quote">"Suspicious activity detected on your account"<br>"Unauthorized transaction of ₹50,000 found"<br>"Your account has been compromised"</div>
            <p class="tactic-example-more">Designed to make you feel threatened and helpless</p>
          </div>
          <div class="tactic-example-box real">
            <span class="teb-label">✅ What to Do</span>
            <div class="tactic-quote">Close the email. Go directly to your bank's official website or call their official customer service number.</div>
            <p class="tactic-example-more">Never call numbers given inside the suspicious email itself</p>
          </div>
        </div>
        <div class="tactic-why-note">
          <div class="twn-icon">🧠</div>
          <p><strong>Why it works:</strong> Fear overrides logic. When you believe you've been hacked, you desperately try to fix it — exactly what attackers want. <strong>Rule:</strong> Verify directly with your bank first.</p>
        </div>
      </div>

      <!-- Tactic 3: Authority -->
      <div class="tactic-section">
        <div class="tactic-header">
          <div class="tactic-num">3</div>
          <h3>Authority — Pretend to Be a Government or Official</h3>
        </div>
        <div class="tactic-two-col">
          <div class="tactic-example-box phish">
            <span class="teb-label">🚨 Phishing Email Says</span>
            <div class="tactic-quote">"This is the RBI Security Team"<br>"Income Tax Department — Final Notice"<br>"Police Cyber Cell Alert: Action Required"</div>
            <p class="tactic-example-more">Uses official-sounding names and seals to seem legitimate</p>
          </div>
          <div class="tactic-example-box real">
            <span class="teb-label">✅ The Reality</span>
            <div class="tactic-quote">The Government of India, RBI, and Income Tax Dept never email to request personal info, OTPs, or payments.</div>
            <p class="tactic-example-more">All government communications are sent by physical mail or their official portals, not emails.</p>
          </div>
        </div>
        <div class="tactic-why-note">
          <div class="twn-icon">🧠</div>
          <p><strong>Why it works:</strong> We're conditioned to trust authority figures. The fear of legal consequences makes people comply without questioning. <strong>Rule:</strong> Government never emails to ask for payment or OTP.</p>
        </div>
      </div>

      <!-- Tactic 4: Greed -->
      <div class="tactic-section">
        <div class="tactic-header">
          <div class="tactic-num">4</div>
          <h3>Greed — Offer Too-Good-to-Be-True Rewards</h3>
        </div>
        <div class="tactic-two-col">
          <div class="tactic-example-box phish">
            <span class="teb-label">🚨 Phishing Email Says</span>
            <div class="tactic-quote">"Congratulations! You've won ₹10 lakh!"<br>"Exclusive cashback of ₹5,000 unlocked"<br>"Limited time: 90% OFF — Only 2 left!"</div>
            <p class="tactic-example-more">Designed to make you click before you think</p>
          </div>
          <div class="tactic-example-box real">
            <span class="teb-label">✅ The Golden Rule</span>
            <div class="tactic-quote">If something sounds too good to be true, it is fake. No stranger is giving you ₹10 lakh for free.</div>
            <p class="tactic-example-more">Legitimate offers don't pressure you with "only 2 left" scarcity tactics via cold emails</p>
          </div>
        </div>
        <div class="tactic-why-note">
          <div class="twn-icon">🧠</div>
          <p><strong>Why it works:</strong> Greed and excitement suppress skepticism. When you think you're about to gain something big, you stop asking questions. <strong>Rule:</strong> You can't win something you never entered.</p>
        </div>
      </div>

      <!-- Tactic 5: Curiosity -->
      <div class="tactic-section">
        <div class="tactic-header">
          <div class="tactic-num">5</div>
          <h3>Curiosity — Make You Want to Know More</h3>
        </div>
        <div class="tactic-two-col">
          <div class="tactic-example-box phish">
            <span class="teb-label">🚨 Phishing Email Says</span>
            <div class="tactic-quote">"You have 3 unread messages waiting"<br>"Someone tagged you in a photo"<br>"See who viewed your profile today"</div>
            <p class="tactic-example-more">Creates an irresistible urge to find out more</p>
          </div>
          <div class="tactic-example-box real">
            <span class="teb-label">✅ What to Do</span>
            <div class="tactic-quote">Hover the link first, verify the sender address, then open the official app or website directly — not through the email link.</div>
            <p class="tactic-example-more">Check your actual social accounts by typing the URL yourself</p>
          </div>
        </div>
        <div class="tactic-why-note">
          <div class="twn-icon">🧠</div>
          <p><strong>Why it works:</strong> Unresolved curiosity is psychologically uncomfortable — we need to know. Attackers exploit this to get you to click without thinking. <strong>Rule:</strong> Always hover first, click never until verified.</p>
        </div>
      </div>

      <!-- SECTION: Interactive Checklist -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Checklist</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">Email Red Flags Checklist</h3>
      <p class="lesson-text">Use this as a mental checklist every time you receive a suspicious email. Click any flag you spot in the email you're analyzing.</p>

      <div class="checklist-wrapper" id="phishingChecklist">
        <div class="checklist-header">
          <h4>🚨 Phishing Indicators</h4>
          <span id="checklistCount">0 / 10 flags found</span>
        </div>
        <div class="checklist-items">
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Generic greeting — "Dear Customer" instead of your real name</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Grammar or spelling mistakes in the email body</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Sender email address doesn't match the company domain</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Asks for your password, OTP, or card details via email</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Creates urgency — "24 hours", "immediately", "last chance"</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Suspicious attachment (especially .exe, .zip, .scr, .bat)</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Contains threats — "account will be closed", "legal action"</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Too-good-to-be-true offer — prize, unexpected cashback</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Unexpected email — you never requested anything from this company</span>
          </div>
          <div class="checklist-item" data-ci>
            <div class="ci-box"></div>
            <span class="ci-text">Link display text doesn't match the real destination URL</span>
          </div>
        </div>
        <div class="checklist-footer">
          <span class="checklist-verdict" id="checklistVerdict">Check any flags you find in a suspicious email</span>
          <button class="btn-reset-checklist" id="resetChecklist">↺ Reset</button>
        </div>
      </div>

      <!-- SECTION: Language Comparison -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Language</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">Phishing vs. Real Email Language</h3>
      <p class="lesson-text">Real companies communicate very differently from attackers. Learn to recognize the language difference instantly.</p>

      <table class="lang-compare-table">
        <thead>
          <tr>
            <th class="phish-head">🚨 Phishing Email</th>
            <th class="real-head">✅ Real Company Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tc-phish">Dear Customer</td>
            <td class="tc-real">Dear Rajesh Kumar</td>
          </tr>
          <tr>
            <td class="tc-phish">Your account is SUSPENDED!</td>
            <td class="tc-real">Account information update available</td>
          </tr>
          <tr>
            <td class="tc-phish">Click here immediately or lose access</td>
            <td class="tc-real">Please review at your convenience</td>
          </tr>
          <tr>
            <td class="tc-phish">Suspicious activity detected. Verify NOW!</td>
            <td class="tc-real">New login detected — Was this you? [Yes] [No]</td>
          </tr>
          <tr>
            <td class="tc-phish">Confirm your password to verify account</td>
            <td class="tc-real">We will NEVER ask for your password via email</td>
          </tr>
          <tr>
            <td class="tc-phish">Reply with your OTP to complete verification</td>
            <td class="tc-real">Enter OTP only on our official app or website</td>
          </tr>
        </tbody>
      </table>

      <!-- SECTION: Attachment Red Flags -->
      <div class="lesson-section-label" style="margin-top:3rem;"><span class="dot"></span> Attachments</div>
      <h3 style="font-size:1.5rem; font-weight:800; color:#1E293B; margin-bottom:0.5rem; letter-spacing:-0.02em;">Attachment Red Flags</h3>
      <p class="lesson-text">Email attachments can install malware the moment you open them. Know exactly which file types to never open from unknown senders.</p>

      <div class="attach-grid">
        <div class="attach-card danger-card">
          <div class="attach-card-title">⚠️ Dangerous File Types — Never Open</div>
          <div class="attach-type-row">
            <span class="ext-badge">.exe</span>
            <span class="attach-type-desc">Executable program — runs code instantly on your machine</span>
          </div>
          <div class="attach-type-row">
            <span class="ext-badge">.zip</span>
            <span class="attach-type-desc">Compressed archive — often hides malware executables inside</span>
          </div>
          <div class="attach-type-row">
            <span class="ext-badge">.scr</span>
            <span class="attach-type-desc">Screen saver file — frequently used as malware disguise</span>
          </div>
          <div class="attach-type-row">
            <span class="ext-badge">.bat</span>
            <span class="attach-type-desc">Batch script — executes system commands without prompting</span>
          </div>
          <div class="attach-type-row">
            <span class="ext-badge">.com</span>
            <span class="attach-type-desc">Command file — old MS-DOS executable format</span>
          </div>
          <div class="attach-rule">🚫 Never open from unknown or unverified senders</div>
        </div>
        <div class="attach-card safe-card">
          <div class="attach-card-title">✅ Usually Safe — But Still Verify Sender</div>
          <div class="attach-type-row">
            <span class="ext-badge">.pdf</span>
            <span class="attach-type-desc">Document — safe but phishing PDFs with links exist</span>
          </div>
          <div class="attach-type-row">
            <span class="ext-badge">.jpg</span>
            <span class="attach-type-desc">Image file — generally safe to open directly</span>
          </div>
          <div class="attach-type-row">
            <span class="ext-badge">.png</span>
            <span class="attach-type-desc">Image file — generally safe to open directly</span>
          </div>
          <div class="attach-type-row">
            <span class="ext-badge">.txt</span>
            <span class="attach-type-desc">Plain text — no executable code, generally safe</span>
          </div>
          <div class="attach-type-row">
            <span class="ext-badge">.csv</span>
            <span class="attach-type-desc">Spreadsheet data — safe if not from unknown senders</span>
          </div>
          <div class="attach-rule">✅ Verify the sender before opening any attachment</div>
        </div>
      </div>

      <div class="callout-box tip" style="margin-top:3rem;">
        <div class="cb-icon">🏆</div>
        <div class="cb-body">
          <h4>Course Complete! You're Now Phishing-Resistant.</h4>
          <p>You've learned what phishing is, how to detect fake senders, how to inspect links, and how attackers manipulate psychology. Take the quiz to test your knowledge and earn your badge!</p>
        </div>
      </div>

      <div class="chapter-footer-nav">
        <button class="btn-chapter-nav prev" data-chapter="3">← Chapter 3</button>
        <button class="btn-chapter-menu"><span>☰</span>Chapter Menu</button>
        <button class="btn-chapter-nav next" onclick="navigate('/quiz')" style="background:#10B981;">Take the Quiz →</button>
      </div>

    </div>
  `
}



function quizContent() {
  if (!quizState.active) {
    return `
      <div class="lesson-article">
        <h2>Phishing <span>Knowledge Quiz</span></h2>
        <p class="lesson-intro">Test your ability to spot malicious emails and protect your digital identity.</p>
        <div style="padding: 4rem; text-align: center; background: white; border-radius: var(--radius-lg); border: 1px solid var(--border); box-shadow: var(--shadow-soft);">
          <div style="font-size: 4rem; margin-bottom: 1.5rem;">🎯</div>
          <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Ready to start?</h3>
          <p style="color: var(--text-muted); margin-bottom: 2rem; max-width: 400px; margin-left: auto; margin-right: auto;">This quiz contains 10 interactive comparison questions based on real-world phishing data.</p>
          <button class="btn-primary" id="startQuizBtn" style="margin: 0 auto;">Start Quiz</button>
        </div>
      </div>
    `
  }

  if (quizState.currentQuestion >= quizQuestions.length) {
    return `
      <div class="lesson-article">
        <div class="quiz-summary">
          <div style="font-size: 5rem; margin-bottom: 2rem;">🏆</div>
          <h2>Quiz <span>Completed!</span></h2>
          <div class="summary-score">${quizState.score} / ${quizQuestions.length}</div>
          <p style="color: var(--text-muted); margin-bottom: 3rem; font-size: 1.25rem;">
            ${quizState.score === quizQuestions.length ? "Incredible! You're a cybersecurity pro." : "Good effort! Review the lessons to improve your score."}
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn-primary" id="retryQuizBtn">Try Again</button>
            <a href="/academy" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; padding: 0 2rem;" data-link>Back to Academy</a>
          </div>
        </div>
      </div>
    `
  }

  const q = quizQuestions[quizState.currentQuestion]
  const progress = ((quizState.currentQuestion) / quizQuestions.length) * 100

  return `
    <div class="lesson-article quiz-article" style="padding-bottom: 5rem;">
      <div class="quiz-header">
        <span class="text-primary font-bold text-sm uppercase tracking-wider">Security Awareness</span>
        <h2 class="quiz-title">${q.title}</h2>
      </div>

      <div class="quiz-progress-section">
        <div class="quiz-progress-top">
           <span class="quiz-step-info">Question ${quizState.currentQuestion + 1} of ${quizQuestions.length}</span>
           <span class="quiz-progress-text">${Math.round(progress)}% Completed</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progress}%;"></div>
        </div>
      </div>

      <div class="quiz-comparison-grid">
        ${q.options.map(opt => `
          <div class="quiz-option-card ${quizState.selectedOption === opt.id ? 'selected' : ''} ${quizState.isAnswered ? (quizState.correctOption === opt.id ? 'correct-result' : (quizState.selectedOption === opt.id ? 'error-result' : '')) : ''}" data-id="${opt.id}">
            <div class="browser-chrome">
              <div class="browser-dots">
                <div class="browser-dot"></div>
                <div class="browser-dot"></div>
                <div class="browser-dot"></div>
              </div>
              <div class="browser-address">
                <span class="material-symbols-outlined address-lock ${opt.isSecure ? 'secure' : 'unsafe'}">${opt.isSecure ? 'lock' : 'lock_open'}</span>
                ${opt.url}
              </div>
            </div>
            
            <div class="email-meta-dojo">
              <div class="meta-sender-info">
                <div class="company-logo" style="background: ${opt.companyColor}">${opt.companyChar}</div>
                <div class="sender-text">
                  <h4>${opt.companyName}</h4>
                  <div class="sender-email ${!opt.isSecure ? 'suspicious' : ''}">${opt.sender}</div>
                </div>
              </div>
              <div class="email-timestamp">${opt.timestamp}</div>
            </div>

            <div class="option-content">
              <div class="email-preview">
                <div class="email-body">
                  ${opt.content}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      ${!quizState.isAnswered ? `
        <div class="quiz-hint-box">
          <div class="hint-icon">💡</div>
          <div class="hint-text">
            <strong>Hint:</strong> ${q.hint}
          </div>
        </div>

        <button class="btn-submit-answer" id="submitAnswerBtn" ${!quizState.selectedOption ? 'disabled' : ''}>
          Submit Answer
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      ` : `
        <div id="feedbackBanner" class="feedback-banner-dojo ${quizState.lastResult ? 'success' : 'error'}">
          <div class="feedback-icon-dojo">
            <span class="material-symbols-outlined text-2xl">${quizState.lastResult ? 'check' : 'close'}</span>
          </div>
          <div class="feedback-body">
            <h3>${quizState.lastResult ? 'Nice spotting! That\'s correct.' : 'Incorrect spotting.'}</h3>
            <p>${q.explanation}</p>
            <button class="btn-next-challenge" id="nextChallengeBtn">
              ${quizState.currentQuestion + 1 >= quizQuestions.length ? 'See Results' : 'Next Challenge'}
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      `}
    </div>
  `
}

function examplesContent() {
  return `
    <div class="lesson-article">
      <h2>Real-World <span>Scam Examples</span></h2>
      <p class="lesson-intro">Browse through actual phishing attempts reported to NexGuard this week.</p>
      <div class="features-grid" style="grid-template-columns: 1fr 1fr; margin-top: 0;">
        <div class="f-card">
          <div class="f-icon" style="background: #fee2e2; color: #ef4444;">🛡️</div>
          <h3>Amazon Refund Scam</h3>
          <p>A sophisticated email mimicking Amazon orders to steal payment info.</p>
          <a href="#" class="f-link">View Analysis →</a>
        </div>
        <div class="f-card">
          <div class="f-icon" style="background: #fef3c7; color: #d97706;">📄</div>
          <h3>IRS Tax Refund</h3>
          <p>Typical government spoofing used during tax season to harvest SSNs.</p>
          <a href="#" class="f-link">View Analysis →</a>
        </div>
      </div>
    </div>
  `
}

function initAcademyLogic() {
  // ── Common ────────────────────────────────────────────────
  const verifyBtn = document.querySelector('.btn-verify')
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      alert("⚠️ DANGER: In a real attack, this button would have stolen your credentials! Always check the 'From Address' first.")
    })
  }

  // ── Chapter Tab Navigation ────────────────────────────────
  document.querySelectorAll('[data-chapter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ch = parseInt(btn.dataset.chapter)
      if (ch && ch !== learnChapter) {
        learnChapter = ch
        navigate('/learn')
      }
    })
  })

  // ── Chapter Footer Prev/Next Nav ──────────────────────────
  document.querySelectorAll('.btn-chapter-nav[data-chapter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ch = parseInt(btn.dataset.chapter)
      if (ch) {
        learnChapter = ch
        navigate('/learn')
      }
    })
  })

  // Chapter Menu button (go to ch 1 as "menu")
  document.querySelectorAll('.btn-chapter-menu').forEach(btn => {
    btn.addEventListener('click', () => {
      learnChapter = 1
      navigate('/learn')
    })
  })

  // ── Phishing-type Accordions (Ch 1) ──────────────────────
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const accId = trigger.dataset.acc
      const item = document.getElementById(accId)
      if (!item) return
      const isOpen = item.classList.contains('open')
      document.querySelectorAll('.accordion-item.open').forEach(el => el.classList.remove('open'))
      if (!isOpen) item.classList.add('open')
    })
  })

  // ── Red Flag Accordions (Ch 3) ────────────────────────────
  document.querySelectorAll('.redflag-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const rfId = trigger.dataset.rf
      const item = document.getElementById(rfId)
      if (!item) return
      const isOpen = item.classList.contains('open')
      document.querySelectorAll('.redflag-item.open').forEach(el => el.classList.remove('open'))
      if (!isOpen) item.classList.add('open')
    })
  })

  // ── Link Reveal Cards (Ch 3) ──────────────────────────────
  document.querySelectorAll('.btn-reveal').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.dataset.lrc
      const card = document.getElementById(cardId)
      if (!card) return
      card.classList.add('revealed')
      // Determine verdict from inner content
      const urlEl = card.querySelector('.link-real-url')
      if (urlEl) {
        if (urlEl.classList.contains('danger')) card.classList.add('revealed-danger')
        else if (urlEl.classList.contains('safe')) card.classList.add('revealed-safe')
      }
      btn.textContent = '✓ Revealed'
      btn.style.background = urlEl && urlEl.classList.contains('safe') ? '#DCFCE7' : '#FEE2E2'
      btn.style.color = urlEl && urlEl.classList.contains('safe') ? '#166534' : '#991B1B'
      btn.style.border = urlEl && urlEl.classList.contains('safe') ? '1px solid #6EE7B7' : '1px solid #FCA5A5'
      btn.disabled = true
    })
  })

  // ── Interactive Checklist (Ch 4) ──────────────────────────
  const checklist = document.getElementById('phishingChecklist')
  if (checklist) {
    const countEl = document.getElementById('checklistCount')
    const verdictEl = document.getElementById('checklistVerdict')
    const resetBtn = document.getElementById('resetChecklist')
    const total = checklist.querySelectorAll('.checklist-item').length

    const updateVerdict = () => {
      const checked = checklist.querySelectorAll('.checklist-item.checked').length
      countEl.textContent = `${checked} / ${total} flags found`
      verdictEl.classList.remove('danger', 'warning')
      if (checked === 0) {
        verdictEl.textContent = 'Check any flags you find in a suspicious email'
      } else if (checked < 3) {
        verdictEl.textContent = `${checked} flag${checked > 1 ? 's' : ''} found — Keep checking…`
        verdictEl.classList.add('warning')
      } else {
        verdictEl.textContent = `🚨 ${checked} flags! This email is almost certainly phishing.`
        verdictEl.classList.add('danger')
      }
    }

    checklist.querySelectorAll('.checklist-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('checked')
        updateVerdict()
      })
    })

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        checklist.querySelectorAll('.checklist-item.checked').forEach(el => el.classList.remove('checked'))
        updateVerdict()
      })
    }
  }

  // ── Quiz Specific Logic ────────────────────────────────────
  if (window.location.pathname === '/quiz') {
    initQuizLogic()
  }
}


function initQuizLogic() {
  const startBtn = document.querySelector('#startQuizBtn')
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      quizState.active = true
      quizState.currentQuestion = 0
      quizState.score = 0
      quizState.selectedOption = null
      quizState.isAnswered = false
      navigate('/quiz')
    })
  }

  const optionCards = document.querySelectorAll('.quiz-option-card')
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      if (quizState.isAnswered) return
      quizState.selectedOption = card.dataset.id
      renderQuiz()
    })
  })

  const submitBtn = document.querySelector('#submitAnswerBtn')
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const q = quizQuestions[quizState.currentQuestion]
      const selected = q.options.find(o => o.id === quizState.selectedOption)
      const correct = q.options.find(o => o.isCorrect)

      quizState.isAnswered = true
      quizState.lastResult = selected.isCorrect
      quizState.correctOption = correct.id

      if (selected.isCorrect) quizState.score++
      renderQuiz()
    })
  }

  const nextBtn = document.querySelector('#nextChallengeBtn')
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      quizState.currentQuestion++
      quizState.selectedOption = null
      quizState.isAnswered = false
      renderQuiz()
    })
  }

  const retryBtn = document.querySelector('#retryQuizBtn')
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      quizState.active = false
      quizState.currentQuestion = 0
      quizState.score = 0
      quizState.selectedOption = null
      quizState.isAnswered = false
      navigate('/quiz')
    })
  }
}

function renderQuiz() {
  const main = document.querySelector('.academy-content')
  if (main) {
    main.innerHTML = quizContent()
    initQuizLogic() // Re-bind events
  }
}


// Page: Academy Topic Grid
function academyGridPage() {
  const topics = [
    { id: 'email', title: 'Email Phishing', icon: '📧', color: '#EEF2FF', iconColor: '#4F46E5', desc: 'Identify fake sender addresses, phishing links in emails, and common email scam tactics used by attackers' },
    { id: 'sms', title: 'SMS & Messaging Scams', icon: '💬', color: '#FAF5FF', iconColor: '#9333EA', desc: 'Scammers use SMS to steal OTPs and personal data. Learn to verify messages before clicking any links' },
    { id: 'web', title: 'Fake Websites & Login Pages', icon: '🌐', color: '#ECFDF5', iconColor: '#10B981', desc: 'Recognize fake login pages, URL manipulation tricks, and domain spoofing techniques used in phishing' },
    { id: 'voice', title: 'Voice & Call Scams (Vishing)', icon: '📞', color: '#FFF1F2', iconColor: '#E11D48', desc: 'Identify phone scams, fake customer support calls, and voice-based fraud attempts targeting your accounts' },
    { id: 'media', title: 'Social Media Scams', icon: '🔗', color: '#EEF2FF', iconColor: '#4F46E5', desc: 'Spot fake profiles, phishing on Instagram, Facebook, LinkedIn, and Twitter used to steal your data' }
  ]

  return `
    ${navigation()}
    <div class="academy-grid-page">
      <div class="container">
        <header class="academy-grid-header">
          <h1>📚 What Do You Want to Learn?</h1>
          <p>Choose a phishing technique to explore in detail</p>
        </header>

        <div class="topic-grid">
          ${topics.map(t => `
            <a href="${t.id === 'email' ? '/learn' : '#'}" class="topic-card" data-link>
              <div class="topic-icon" style="background: ${t.color};">
                ${t.icon}
              </div>
              <h3>${t.title}</h3>
              <p>${t.desc}</p>
              <div class="btn-topic" style="pointer-events: none;">
                Start Learning
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>
          `).join('')}
        </div>

        <footer class="academy-grid-footer">
          NexGuard Academy © 2026 • Professional Safety Training
        </footer>
      </div>
    </div>
    ${footer()}
  `
}

function initAcademyGridLogic() {
  // Logic for grid page if needed
}

function analyzePage() {
  if (analysisState.loading) {
    return `
      ${navigation()}
      <div class="analyze-loading-screen">
        <div class="container">
          <div class="scanner-container">
            <div class="scanner-header">
              <div class="status-badge" style="background: #eff6ff, color: #2563eb;">
                <div class="status-dot" style="background: #3b82f6; box-shadow: 0 0 8px #3b82f6;"></div>
                System Analyzing
              </div>
              <h1 class="scanner-title">Deep Scanning Content...</h1>
              <p class="scanner-subtitle">Our AI experts are breaking down the message structure to identify potential threats.</p>
            </div>
            
            <div class="scan-visual">
              <div class="scan-beam"></div>
              <div class="scan-content-preview">
                ${analysisState.userInput.substring(0, 150)}${analysisState.userInput.length > 150 ? '...' : ''}
              </div>
            </div>

            <div class="scan-steps">
              <div class="scan-step active">
                <div class="step-check">✓</div>
                <span>Extracting metadata...</span>
              </div>
              <div class="scan-step active">
                <div class="step-check">✓</div>
                <span>Checking URL reputation...</span>
              </div>
              <div class="scan-step loading">
                <div class="step-spinner"></div>
                <span>AI Language Analysis...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${footer()}
    `
  }

  if (analysisState.error) {
    return `
      ${navigation()}
      <div class="container" style="padding: 100px 0; text-align: center;">
        <div class="error-card">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
          <h2>Analysis Failed</h2>
          <p>${analysisState.error}</p>
          <button class="btn-primary" onclick="location.href='/'" style="margin: 2rem auto;">Try Again</button>
        </div>
      </div>
      ${footer()}
    `
  }

  if (!analysisState.result) {
    return `
      ${navigation()}
      <div class="container" style="padding: 100px 0; text-align: center;">
        <h1>No Content to Analyze</h1>
        <p>Please enter a message on the homepage first.</p>
        <button class="btn-primary" onclick="location.href='/'" style="margin: 2rem auto;">Go Home</button>
      </div>
      ${footer()}
    `
  }

  // Handle n8n schema variations and string-based scores
  const res = analysisState.result;
  const score = parseInt(res.risk_score || 0, 10);
  const isDangerous = score >= 50;
  const themeClass = isDangerous ? 'dangerous' : 'safe';
  const scoreColor = isDangerous ? '🔴' : '🟢';
  const levelLabel = isDangerous ? 'DANGEROUS' : 'LOOKS SAFE';

  const redFlags = Array.isArray(res.red_flags)
    ? res.red_flags.map(f => typeof f === 'object' ? f.description : f)
    : [];
  const attackerGoal = res.ai_insight || res.attacker_goal || 'Not specified';
  const recommendedAction = Array.isArray(res.recommended_actions)
    ? res.recommended_actions.join('\n')
    : (res.recommended_action || 'No action specified');

  return `
    ${navigation()}
    <div class="analysis-result-page">
      <div class="container">
        <div class="result-card ${themeClass}">
          <div class="result-header">
            <div class="result-score-line">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
            <div class="result-title">
              ${scoreColor} ${levelLabel} (${score}/100)
            </div>
            <div class="result-type">
              Type: ${res.content_type || 'Unknown'}
            </div>
            <div class="result-score-line">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
          </div>

          <div class="result-body">
            <div class="result-section">
              <h3 class="section-title">${isDangerous ? '⚠️ Issues:' : '✓ Analysis:'}</h3>
              <ul class="issues-list">
                ${redFlags.length > 0
      ? redFlags.map(flag => `<li>${isDangerous ? '-' : '✓'} ${flag}</li>`).join('')
      : '<li>No specific flags detected.</li>'}
              </ul>
            </div>

            <div class="result-section">
              <h3 class="section-title">💡 ${isDangerous ? 'Attacker Goal:' : 'Tip:'}</h3>
              <p class="section-text">${isDangerous ? attackerGoal : 'Still hover links before clicking'}</p>
            </div>

            <div class="result-section">
              <h3 class="section-title">✅ Action:</h3>
              <p class="section-text" style="white-space: pre-line;">${recommendedAction}</p>
            </div>

            <div class="result-actions">
              ${isDangerous ? '<button class="btn-report">Report</button>' : ''}
              <button class="btn-scan-another" id="scanAnotherBtn">Scan Another</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${footer()}
  `
}

function initAnalyzeLogic() {
  if (!analysisState.userInput) return

  const scanAnotherBtn = document.querySelector('#scanAnotherBtn')
  if (scanAnotherBtn) {
    scanAnotherBtn.addEventListener('click', () => {
      analysisState.result = null
      navigate('/')
    })
    return // If we already have results, don't trigger fetch
  }

  // Trigger n8n fetch
  analysisState.loading = true
  analysisState.error = null
  renderAnalyzePage()

  // Using AbortController for 60s timeout handling (AI Agent can be slow)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  console.log('Starting fetch to n8n...');

  fetch('https://primary-production-59cbf.up.railway.app/webhook/db5b2183-ad15-47c6-aeab-c25b98aa3f95', {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify({
      user_input: analysisState.userInput
    })
  })
    .then(async response => {
      clearTimeout(timeoutId);
      console.log('n8n Response status:', response.status);

      const rawText = await response.text();
      console.log('n8n Raw Response Body:', rawText);

      if (!response.ok) {
        throw new Error(`Server Error (${response.status}): ${rawText || 'No detail'}`);
      }

      if (!rawText) {
        throw new Error('N8N returned an empty response. Ensure your Webhook node is set to "Respond: When Last Node Finishes" and your nodes are connected.');
      }

      try {
        return JSON.parse(rawText);
      } catch (e) {
        console.error('JSON Parse Error. Raw text was:', rawText);
        throw new Error(`Invalid JSON received from n8n: ${rawText.substring(0, 50)}...`);
      }
    })
    .then(data => {
      console.log('Parsed n8n data:', data);

      // n8n might return: 
      // 1. Array: [{...}]
      // 2. Object: {...}
      // 3. Nested: { output: {...} }
      let result = Array.isArray(data) ? data[0] : data;
      if (result && result.output && typeof result.output === 'object') {
        result = result.output;
      }

      if (!result || typeof result !== 'object') {
        throw new Error('Could not find analysis data in the response.');
      }

      analysisState.result = result;
      analysisState.loading = false;
      renderAnalyzePage();
    })
    .catch(err => {
      clearTimeout(timeoutId);
      console.error('Detailed Analysis Error:', err);

      let errorMsg = err.message;
      if (err.name === 'AbortError') {
        errorMsg = "Request Timed Out. Your n8n AI Agent is taking more than 60 seconds to respond. Check your n8n logs.";
      } else if (err.message === 'Failed to fetch' || err.message.includes('ERR_NETWORK_CHANGED')) {
        errorMsg = "Connection Interrupted. This usually means a VPN toggled, your n8n instance restarted, or CORS is still blocking the request.";
      }

      analysisState.error = `<strong>Technical Error:</strong> ${errorMsg} <br/><br/> 
                             <strong>Suggestions:</strong><br/>
                             1. Ensure the n8n workflow is <b>Active</b>.<br/>
                             2. If using a VPN, try disabling it.<br/>
                             3. Check if you can visit the n8n URL directly in a new tab.`
      analysisState.loading = false
      renderAnalyzePage()
    })
}

function initHomeLogic() {
  const input = document.querySelector('#scanInput')
  const scanBtn = document.querySelector('#scanBtn')
  const resultsContainer = document.querySelector('#inlineAnalysisContainer')

  scanBtn.addEventListener('click', () => {
    if (!input.value.trim()) return
    const userInput = input.value.trim()

    // Clear previous results and enter loading state
    resultsContainer.innerHTML = renderScanLoader(userInput)
    scanBtn.disabled = true
    scanBtn.innerHTML = 'Analyzing...'

    // Scroll to loader
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    fetch('https://primary-production-59cbf.up.railway.app/webhook/db5b2183-ad15-47c6-aeab-c25b98aa3f95', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input: userInput })
    })
      .then(async response => {
        clearTimeout(timeoutId);
        let rawText = await response.text();
        if (!response.ok) throw new Error(`Server Error (${response.status})`);
        if (!rawText) throw new Error('N8N returned an empty response.');

        // Robust JSON Extraction (handles markdown wrappers or leading/trailing text)
        try {
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) rawText = jsonMatch[0];
          return JSON.parse(rawText);
        } catch (e) {
          console.error('JSON Parse Error:', e, 'Raw Text:', rawText);
          throw new Error('AI Agent output was malformed. Please try again.');
        }
      })
      .then(data => {
        // 1. Robustly find the analysis object
        let res = Array.isArray(data) ? data[0] : data;
        if (res && res.output && typeof res.output === 'object') res = res.output;

        // Detailed check for placeholders
        const isPlaceholder = (val) => typeof val === 'string' && val.includes('{') && val.includes('}');

        if (!res || isPlaceholder(res.risk_score) || isPlaceholder(res.ai_insight)) {
          throw new Error('<strong>n8n Configuration Error:</strong> The AI Agent is returning empty placeholders (e.g. {risk_score}). <br/><br/>Please ensuring your <b>n8n AI Agent node</b> has the "Input Text" field set to <code>{{ $json.user_input }}</code>.');
        }

        resultsContainer.innerHTML = renderInlineAnalysis(res);
        scanBtn.disabled = false;
        scanBtn.innerHTML = `Analyze Message <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

        // Auto-rebind the scan another button
        const scanAnother = document.querySelector('#scanAnotherInline')
        if (scanAnother) {
          scanAnother.addEventListener('click', () => {
            input.value = ''
            resultsContainer.innerHTML = ''
            input.focus()
          })
        }
      })
      .catch(err => {
        clearTimeout(timeoutId);
        resultsContainer.innerHTML = `
        <div class="inline-error-card">
          <div class="error-icon">⚠️</div>
          <div class="error-details">
            <h4>Connection Interrupted</h4>
            <p>${err.message}</p>
            <button class="btn-secondary" onclick="document.querySelector('#scanBtn').click()">Retry Scan</button>
          </div>
        </div>
      `;
        scanBtn.disabled = false;
        scanBtn.innerHTML = `Analyze Message <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      });
  })

  // Demo Examples Logic
  const demoTexts = {
    sms: "HDFC Bank: Your account has been temporarily suspended due to suspicious activity. Click here to verify your details immediately: http://hdfc-verify.co.in/urgent\nReply STOP to opt out",
    job: "From: hr.recruitment@google-careers.co.in\nSubject: Immediate Job Offer - Google India\nDear Candidate,\nCongratulations! You have been selected for Software Engineer position at Google India with salary package of ₹18 LPA.\nTo confirm your position, please pay a one-time registration fee of ₹5,000 via UPI to process your offer letter and joining kit.\nUPI ID: careers.google@paytm\nPayment must be completed within 24 hours.\nBest Regards,\nHR Team\nGoogle India",
    url: "https://paypa1-secure-login.com/verify-account?user=12345&redirect=true",
    upi: "Hi! This is Amazon customer care. Your order #45678 has payment issue. Please complete payment via this UPI link to avoid cancellation: \ngpay://upi/pay?pa=merchant.amazon@paytm&pn=Amazon%20Payment&am=2499&cu=INR\nYour order will be cancelled in 2 hours if payment not received."
  }

  const demoButtons = document.querySelectorAll('.demo-btn')
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      resultsContainer.innerHTML = '' // Clear results when clicking demo
      const type = btn.dataset.example
      input.value = demoTexts[type]
      input.classList.remove('animate-pulse-cyan')
      void input.offsetWidth
      input.classList.add('animate-pulse-cyan')
      input.focus()
    })
  })
}

function renderScanLoader(userInput) {
  return `
    <div class="inline-loader premium">
      <div class="scanner-visual-large">
        <div class="scan-beam-active"></div>
        <div class="scan-particles"></div>
        <div class="scan-data-stream">
          ${Array(5).fill(0).map(() => `<span>${Math.random().toString(16).substring(2, 10)}</span>`).join('')}
        </div>
      </div>
      <div class="loader-content">
        <h3>Analyzing Message Structure...</h3>
        <div class="scan-progress-steps">
          <div class="progress-step active">Decoding metadata...</div>
          <div class="progress-step pulse">AI language modeling...</div>
          <div class="progress-step">Vectorizing threats...</div>
        </div>
      </div>
    </div>
  `
}

function renderInlineAnalysis(res) {
  // 2. Fix NaN issue - ensure score is a valid number
  const scoreRaw = res.risk_score;
  const score = parseInt(scoreRaw, 10) || 0;

  const isDangerous = score >= 50;
  const themeClass = isDangerous ? 'dangerous' : 'safe';

  // 3. Handle red flags robustly (objects or strings)
  const redFlags = (Array.isArray(res.red_flags) ? res.red_flags : [])
    .slice(0, 3)
    .map(f => {
      if (typeof f === 'object' && f !== null) return f.description || f.type || 'Suspicious indicator found';
      return String(f);
    });

  // 4. Handle insight and actions safely
  const insight = (res.ai_insight || 'No specific insights reported.').split('.')[0] + '.';
  const actions = Array.isArray(res.recommended_actions)
    ? res.recommended_actions.slice(0, 2)
    : [res.recommended_action || 'Proceed with caution.'];

  return `
    <div class="inline-result-premium ${themeClass}">
      <div class="premium-card-glow"></div>
      
      <div class="res-header-premium">
        <div class="res-status-group">
          <div class="status-indicator"></div>
          <div class="status-details">
            <span class="status-label">${isDangerous ? 'THREAT DETECTED' : 'SYSTEM VERIFIED'}</span>
            <span class="status-sub">${res.content_type || 'Message'} Analysis</span>
          </div>
        </div>
        <div class="res-score-ring" style="--score: ${score}">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle" stroke-dasharray="${score}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20" class="percentage">${score}</text>
            <text x="18" y="26" class="score-label-svg">RISK SCORE</text>
          </svg>
        </div>
      </div>
      
      <div class="res-content-premium">
        <div class="res-section-p">
          <h4 class="section-title-p">
            ${isDangerous ? '🔍 SECURITY FLAGS' : '🛡️ SAFETY INDICATORS'}
          </h4>
          <ul class="premium-list">
            ${redFlags.length > 0
      ? redFlags.map(f => `<li><span class="list-dot"></span>${f}</li>`).join('')
      : (isDangerous ? '<li>Anomalous patterns detected.</li>' : '<li>No malicious signatures found.</li>')}
          </ul>
        </div>
        
        <div class="res-section-p highlight">
          <h4 class="section-title-p">💡 AI EXPERT INSIGHT</h4>
          <p class="insight-text-premium">${insight}</p>
        </div>
      </div>
      
      <div class="res-footer-premium">
        <div class="recommended-action-bar">
          <span class="action-tag">RECOMMENDED ACTION</span>
          <div class="action-list-mini">
            ${actions.map(a => `<span class="action-item-p">${a}</span>`).join(' • ')}
          </div>
        </div>
        
        <div class="premium-action-btns">
          ${isDangerous ? '<button class="btn-premium-red">REPORT THREAT</button>' : ''}
          <button class="btn-premium-ghost" id="scanAnotherInline">SCAN ANOTHER</button>
        </div>
      </div>
    </div>
  `
}

function renderAnalyzePage() {
  // This is no longer used for routing but keeping it as a fallback shell if needed
  const page = analyzePage()
  app.innerHTML = page
}
const PHISH_SCENARIOS = [
  {
    type: 'email',
    title: 'Membership Renewal',
    hint: 'Check the sender address and urgency in the message.',
    options: [
      {
        id: 'real',
        sender: 'info@netflix.com',
        subject: 'Your membership has been renewed',
        content: `Hi John, We hope you're enjoying your time on Netflix. We're writing to confirm that your membership has been automatically renewed. You can view your payment details in your account settings.`,
        isReal: true,
        companyName: 'Netflix',
        companyColor: '#E50914',
        companyChar: 'N'
      },
      {
        id: 'fake',
        sender: 'service@netfIix-security.com',
        subject: 'Urgent: Update Payment Method',
        content: `Dear Customer, We failed to process your latest payment. Your membership will be suspended immediately unless you update your information. Don't lose access to your favorite shows.`,
        isReal: false,
        companyName: 'Netflix Support',
        companyColor: '#E50914',
        companyChar: 'N'
      }
    ],
    explanation: '🚨 <b>The second email is FAKE.</b> Notice the sender address <i>netf<b>I</b>ix-security.com</i> uses a capital "I" to mimic "l". Also, legitimate companies rarely use threats of immediate suspension to force clicks.'
  },
  {
    type: 'email',
    title: 'Order Confirmation',
    hint: 'Look closely at the links and the sender domain.',
    options: [
      {
        id: 'fake',
        sender: 'orders@amazon-india-support.com',
        subject: 'Action Required: Your Amazon.in Order #402-1234567',
        content: `We've encountered a problem with your shipping address. To avoid order cancellation, please confirm your details here: <br><br><center><button style="background:#FF9900; border:none; padding:10px 20px; border-radius:4px; font-weight:bold; cursor:pointer;">Update Address</button></center>`,
        isReal: false,
        companyName: 'Amazon India',
        companyColor: '#232f3e',
        companyChar: 'A'
      },
      {
        id: 'real',
        sender: 'ship-confirm@amazon.in',
        subject: 'Your order has been shipped!',
        content: `Good news! Your order #405-9876543 has been shipped and is on its way. You can track your package on the Amazon app or website. Thank you for shopping with us!`,
        isReal: true,
        companyName: 'Amazon.in',
        companyColor: '#232f3e',
        companyChar: 'A'
      }
    ],
    explanation: '🚨 <b>The first email is FAKE.</b> The real Amazon domain in India is <i>amazon.in</i>. Scammers use complex-looking domains like <i>amazon-india-support.com</i> to deceive you. Always use the official app to check order issues.'
  },
  {
    type: 'sms',
    title: 'Bank Alert',
    hint: 'Banks use official shortcodes and never link to non-official domains.',
    options: [
      {
        id: 'real',
        sender: 'AD-HDFCBK',
        content: 'Alert: Your HDFC Bank Acct XX1234 has been credited with Rs. 50,000.00 on 25-Feb-23. Info: Salary. Call 1800-XXX-XXXX for any queries.',
        isReal: true
      },
      {
        id: 'fake',
        sender: '+91 98XXX XXXXX',
        content: 'HDFC Alert: Your NetBanking access has been blocked due to suspicious activity. Click here to reactivate now: http://hdfcbk-online.net/login. Failure to act will result in account closure.',
        isReal: false
      }
    ],
    explanation: '🚨 <b>The second SMS is FAKE.</b> Banks send alerts via shortcodes (e.g., AD-HDFCBK), not random mobile numbers. Also, they never link to suspicious domains like <i>hdfcbk-online.net</i> for urgent logins.'
  },
  {
    type: 'email',
    title: 'Security Alert',
    hint: 'Compare the sender address character by character.',
    options: [
      {
        id: 'real',
        sender: 'no-reply@accounts.google.com',
        subject: 'Security alert for your linked Google Account',
        content: `A new sign-in was detected on a Windows device. If this was you, you can ignore this email. If not, please review your account activity.`,
        isReal: true,
        companyName: 'Google',
        companyColor: '#4285F4',
        companyChar: 'G'
      },
      {
        id: 'fake',
        sender: 'security@googie.com',
        subject: 'Warning: Unauthorized login detected',
        content: `Someone just logged into your Gmail from Moscow, Russia. If this wasn't you, click the button below to secure your account immediately: <br><br><center><button style="background:#1a73e8; border:none; padding:10px 20px; border-radius:4px; color:white; font-weight:bold; cursor:pointer;">Secure Account</button></center>`,
        isReal: false,
        companyName: 'Google Security',
        companyColor: '#4285F4',
        companyChar: 'G'
      }
    ],
    explanation: '🚨 <b>The second email is FAKE.</b> The sender domain is <i>goo<b>gi</b>e.com</i> (with an "i"), not <i>google.com</i>. This is called typosquatting. Scammers hope you won\'t notice the slight spelling difference.'
  },
  {
    type: 'sms',
    title: 'Package Delivery',
    hint: 'Check for random links and generic language.',
    options: [
      {
        id: 'fake',
        sender: 'InfoMsg',
        content: 'BlueDart: Your package #BD7782 cannot be delivered due to missing house number. Update your address within 24 hours to avoid return: https://bluedart-delivery.in/update',
        isReal: false
      },
      {
        id: 'real',
        sender: 'BLUDART',
        content: 'Great news! Your BlueDart shipment #892210 is out for delivery today. Use PIN 1234 to verify. Track at bit.ly/official-link',
        isReal: true
      }
    ],
    explanation: '🚨 <b>The first SMS is FAKE.</b> Scammers use "failed delivery" scams to harvest addresses and credit card info. The link <i>bluedart-delivery.in</i> is not an official subdomain. BlueDart typically uses shortcodes like <i>BLUDART</i>.'
  }
];

let simState = {
  currentStep: 0,
  score: 0,
  isAnswered: false,
  selectedId: null,
  finished: false
};

function simulatorPage() {
  if (simState.finished) return renderSimSummary();

  const s = PHISH_SCENARIOS[simState.currentStep];
  const progress = ((simState.currentStep) / PHISH_SCENARIOS.length) * 100;

  return `
    ${navigation()}
    <div class="sim-wrapper">
      <div class="container">
        <div class="sim-header">
          <div class="sim-badge">Spot the Phish Challenge</div>
          <h1>${s.title}</h1>
          <p>${s.hint}</p>
        </div>

        <div class="sim-progress-bar">
          <div class="sim-progress-fill" style="width: ${progress}%"></div>
        </div>

        <div class="sim-grid">
          ${s.options.map(opt => `
            <div class="sim-card ${opt.type === 'sms' ? 'sms-mode' : ''} ${simState.selectedId === opt.id ? 'selected' : ''} ${simState.isAnswered ? (opt.isReal ? 'real-result' : 'fake-result') : ''}" data-id="${opt.id}">
              ${s.type === 'email' ? renderEmailUI(opt) : renderSMSUI(opt)}
            </div>
          `).join('')}
        </div>

        <div id="simFeedbackContainer">
          ${simState.isAnswered ? renderSimFeedback(s) : `
            <button class="btn-primary" id="simSubmitBtn" ${!simState.selectedId ? 'disabled' : ''} style="margin: 2rem auto;">
              Identify the Fake
            </button>
          `}
        </div>
      </div>
    </div>
    ${footer()}
  `;
}

function renderEmailUI(opt) {
  return `
    <div class="email-container">
      <div class="email-header">
        <div class="email-avatar" style="background: ${opt.companyColor}">${opt.companyChar}</div>
        <div class="email-meta">
          <div class="email-sender-name">${opt.companyName}</div>
          <div class="email-sender-addr">&lt;${opt.sender}&gt;</div>
        </div>
      </div>
      <div class="email-subject-line">${opt.subject}</div>
      <div class="email-body-content">${opt.content}</div>
    </div>
  `;
}

function renderSMSUI(opt) {
  return `
    <div class="sms-container">
      <div class="sms-sender-info">${opt.sender}</div>
      <div class="sms-bubble">
        ${opt.content}
      </div>
    </div>
  `;
}

function renderSimFeedback(scenario) {
  const isCorrect = (simState.selectedId === 'fake');
  return `
    <div class="sim-feedback-box ${isCorrect ? 'correct' : 'wrong'}">
      <div class="sim-feedback-header">
        <span class="fb-icon">${isCorrect ? '✨' : '⚠️'}</span>
        <h3>${isCorrect ? 'Perfect Spotting!' : 'You Got Tricked!'}</h3>
      </div>
      <p class="sim-explanation">${scenario.explanation}</p>
      <button class="btn-primary" id="nextSimBtn" style="margin-top: 1.5rem;">
        ${simState.currentStep + 1 >= PHISH_SCENARIOS.length ? 'Show My Results' : 'Next Scenario'}
      </button>
    </div>
  `;
}

function renderSimSummary() {
  const score = simState.score;
  const total = PHISH_SCENARIOS.length;
  const percentage = (score / total) * 100;

  let msg = "Keep practicing! Scammers are getting smarter every day.";
  if (percentage === 100) msg = "Expert level! You have a sharp eye for detail.";
  else if (percentage >= 60) msg = "Great effort! You caught most of the tricks.";

  return `
    ${navigation()}
    <div class="sim-summary-page">
      <div class="container">
        <div class="summary-card">
          <div class="summary-icon">🏆</div>
          <h1>Challenge Complete!</h1>
          <div class="summary-score">
            <span class="score-num">${score}</span>
            <span class="score-total">/ ${total}</span>
          </div>
          <p class="summary-msg">${msg}</p>
          <div class="summary-actions">
            <button class="btn-primary" onclick="location.reload()">Try Again</button>
            <a href="/" class="btn-secondary" data-link style="margin-top: 1rem;">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
    ${footer()}
  `;
}

function initSimulatorLogic() {
  const cards = document.querySelectorAll('.sim-card');
  const submitBtn = document.querySelector('#simSubmitBtn');
  const feedbackContainer = document.querySelector('#simFeedbackContainer');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (simState.isAnswered) return;
      simState.selectedId = card.dataset.id;
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      if (submitBtn) submitBtn.disabled = false;
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      simState.isAnswered = true;
      if (simState.selectedId === 'fake') simState.score++;
      app.innerHTML = simulatorPage();
      initSimulatorLogic();
    });
  }

  const nextBtn = document.querySelector('#nextSimBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (simState.currentStep + 1 < PHISH_SCENARIOS.length) {
        simState.currentStep++;
        simState.isAnswered = false;
        simState.selectedId = null;
        app.innerHTML = simulatorPage();
        initSimulatorLogic();
      } else {
        simState.finished = true;
        app.innerHTML = simulatorPage();
        initSimulatorLogic();
      }
    });
  }
}


// Initialize
handleRoute()
