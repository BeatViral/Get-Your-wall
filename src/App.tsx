import { useEffect, useState, type CSSProperties } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Copy,
  Heart,
  Image,
  Link,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Share2,
  Video,
  X,
} from "lucide-react";
import "./App.css";

type Theme = "trek" | "mahmood" | "ferrari";
type Person = {
  name: string;
  initials: string;
  bio: string;
  location: string;
  color: string;
};
type Comment = {
  id: string;
  author: Person;
  text: string;
  likes: number;
  replies?: Comment[];
};
type Post = {
  id: string;
  author: Person;
  time: string;
  text: string;
  likes: number;
  comments: Comment[];
  visual?: string;
  interaction?: "crew" | "collection" | "design" | "race";
  poll?: boolean;
  audio?: boolean;
  liked?: boolean;
};
const people: Record<string, Person> = {
  official: {
    name: "Official Wall",
    initials: "OW",
    bio: "Official updates from the Wall team.",
    location: "Everywhere",
    color: "#b8ff3d",
  },
  maya: {
    name: "Maya Chen",
    initials: "MC",
    bio: "Collector of stories, stars and good coffee.",
    location: "Melbourne, AU",
    color: "#7d7cff",
  },
  daniel: {
    name: "Daniel Reed",
    initials: "DR",
    bio: "Making room for the things that matter.",
    location: "Seattle, US",
    color: "#f1b83b",
  },
  aisha: {
    name: "Aisha Rahman",
    initials: "AR",
    bio: "Listener, writer and eternal optimist.",
    location: "Sydney, AU",
    color: "#f07f74",
  },
  omar: {
    name: "Omar Siddiqui",
    initials: "OS",
    bio: "Music keeps the family together.",
    location: "London, UK",
    color: "#b278cf",
  },
  luca: {
    name: "Luca Moretti",
    initials: "LM",
    bio: "Roads before sunrise.",
    location: "Milan, IT",
    color: "#d82931",
  },
  isabella: {
    name: "Isabella Rossi",
    initials: "IR",
    bio: "Keeping beautiful histories alive.",
    location: "Florence, IT",
    color: "#e0a43d",
  },
};
const wallData: Record<
  Theme,
  {
    name: string;
    label: string;
    sub: string;
    desc: string;
    count: number;
    accent: string;
    posts: Post[];
  }
> = {
  trek: {
    name: "STAR TREK WALL",
    label: "FILM & FRANCHISE",
    sub: "The official Star Trek social universe.",
    desc: "News, trailers, fan theories, artwork and conversations from across the galaxy.",
    count: 48231,
    accent: "#88a9ff",
    posts: [
      {
        id: "t1",
        author: { ...people.official, name: "Star Trek" },
        time: "12m",
        text: "A new journey begins. Which part of the galaxy should we explore next?",
        likes: 2843,
        comments: [
          {
            id: "c1",
            author: people.maya,
            text: "The old frontier. Give us the quiet, strange stories.",
            likes: 28,
          },
        ],
        interaction: "crew",
      },
      {
        id: "t2",
        author: people.maya,
        time: "35m",
        text: "I still think the greatest stories are the ones where there is no easy answer. Which episode stayed with you the longest?",
        likes: 482,
        comments: [
          {
            id: "c2",
            author: people.daniel,
            text: "The ones that make you question your own certainty.",
            likes: 16,
          },
        ],
      },
      {
        id: "t3",
        author: people.daniel,
        time: "1h",
        text: "My collection finally has its own display wall. It took three weekends, but I think it was worth it.",
        likes: 619,
        comments: [],
        interaction: "collection",
      },
      {
        id: "t4",
        author: { ...people.official, name: "Star Trek" },
        time: "2h",
        text: "Cast conversation begins Friday at 7:00 PM. Leave your questions below and we may include them in the live discussion.",
        likes: 1204,
        comments: [],
      },
      {
        id: "t5",
        author: { ...people.maya, name: "Arjun Patel", initials: "AP" },
        time: "3h",
        text: "Theory: the smallest detail in the teaser may be the most important one. Look at the star map behind the captain.",
        likes: 312,
        comments: [],
      },
      {
        id: "t6",
        author: { ...people.aisha, name: "Sofia Williams", initials: "SW" },
        time: "5h",
        text: "My daughter watched her first Star Trek episode tonight. A new generation has officially joined the crew.",
        likes: 888,
        comments: [],
      },
    ],
  },
  mahmood: {
    name: "MAHMOOD KHAN",
    label: "ARTIST",
    sub: "Music, stories and listeners in one place.",
    desc: "The official social Wall for Mahmood’s music, films, thoughts and the people who have travelled with the work.",
    count: 19642,
    accent: "#e8bc72",
    posts: [
      {
        id: "m1",
        author: { ...people.official, name: "Mahmood Khan", initials: "MK" },
        time: "Pinned",
        text: "I wanted one place where I could share the music directly and where everyone listening could also speak, post, remember and connect.\n\nWelcome to my Wall.",
        likes: 3337,
        comments: [
          {
            id: "m1c",
            author: people.aisha,
            text: "This feels like coming home.",
            likes: 44,
          },
        ],
        visual: "album",
      },
      {
        id: "m2",
        author: { ...people.official, name: "Mahmood Khan", initials: "MK" },
        time: "28m",
        text: "Found an unfinished piano idea from years ago today. I had forgotten the melody, but somehow my hands remembered it.",
        likes: 1042,
        comments: [],
        visual: "piano",
      },
      {
        id: "m3",
        author: people.aisha,
        time: "1h",
        text: "“Echo Moon” found me at exactly the right time. Some songs become part of your own history.",
        likes: 493,
        comments: [],
      },
      {
        id: "m4",
        author: { ...people.official, name: "Mahmood Khan", initials: "MK" },
        time: "2h",
        text: "Should I release the original demo or finish it properly first?",
        likes: 774,
        comments: [],
        poll: true,
      },
      {
        id: "m5",
        author: people.omar,
        time: "3h",
        text: "I first heard Mahmood’s music through my father. Now my own daughter asks me to play the same songs in the car.",
        likes: 682,
        comments: [],
      },
      {
        id: "m6",
        author: { ...people.official, name: "Mahmood Khan", initials: "MK" },
        time: "5h",
        text: "A short piece from tonight’s recording session. Headphones recommended.",
        likes: 912,
        comments: [],
        audio: true,
      },
    ],
  },
  ferrari: {
    name: "FERRARI WALL",
    label: "GLOBAL BRAND",
    sub: "Performance, design and passion—shared.",
    desc: "The official Wall for Ferrari cars, racing, launches, collectors, events and the people who live the brand.",
    count: 72358,
    accent: "#f03c39",
    posts: [
      {
        id: "f1",
        author: { ...people.official, name: "Ferrari Official", initials: "F" },
        time: "9m",
        text: "Every line begins with a purpose. A new chapter in Ferrari design arrives this Thursday. What detail do you notice first?",
        likes: 4821,
        comments: [
          {
            id: "f1c",
            author: people.luca,
            text: "The tension between the front fender and cabin. It feels alive.",
            likes: 62,
          },
        ],
        interaction: "design",
      },
      {
        id: "f2",
        author: people.luca,
        time: "42m",
        text: "Early morning drive before the roads filled up. Some moments do not need a destination.",
        likes: 1096,
        comments: [],
      },
      {
        id: "f3",
        author: { ...people.official, name: "Ferrari Racing", initials: "FR" },
        time: "1h",
        text: "Race weekend begins now. Predictions for qualifying?",
        likes: 3243,
        comments: [
          {
            id: "f3c",
            author: people.isabella,
            text: "Leclerc by two tenths. The track suits him.",
            likes: 14,
          },
        ],
        interaction: "race",
      },
      {
        id: "f4",
        author: people.isabella,
        time: "2h",
        text: "My grandfather kept every Ferrari magazine he bought from 1968 onward. We finally organised the complete collection.",
        likes: 783,
        comments: [],
      },
      {
        id: "f5",
        author: { ...people.official, name: "Ferrari Official", initials: "F" },
        time: "4h",
        text: "Maranello Design Conversation. Join the team behind the new interior architecture for a live discussion.",
        likes: 2452,
        comments: [],
      },
      {
        id: "f6",
        author: { ...people.daniel, name: "James Walker", initials: "JW" },
        time: "6h",
        text: "There is a difference between seeing one in photographs and hearing one approach from half a kilometre away.",
        likes: 920,
        comments: [],
      },
    ],
  },
};
const Avatar = ({ p, onClick }: { p: Person; onClick?: () => void }) => (
  <button
    className="avatar"
    style={{ background: p.color }}
    onClick={onClick}
    aria-label={`View ${p.name} profile`}
  >
    {p.initials}
  </button>
);

function App() {
  const [route, setRoute] = useState(location.hash || "#/");
  useEffect(() => {
    const h = () => setRoute(location.hash || "#/");
    addEventListener("hashchange", h);
    return () => removeEventListener("hashchange", h);
  }, []);
  const go = (x: string) => (location.hash = x);
  return route.includes("/wall/") ? (
    <WallPage theme={route.split("/").pop() as Theme} go={go} />
  ) : (
    <Landing go={go} />
  );
}
function Landing({ go }: { go: (s: string) => void }) {
  const [wizard, setWizard] = useState(false);
  return (
    <main className="landing">
      <nav className="topnav">
        <a className="wordmark" href="#/">
          GET <i /> YOUR WALL
        </a>
        <div className="navlinks">
          <a href="#walls">Explore Walls</a>
          <a href="#how">How It Works</a>
          <button onClick={() => setWizard(true)}>Create Your Wall</button>
        </div>
        <button className="lime" onClick={() => setWizard(true)}>
          Get Your Wall <ChevronRight size={17} />
        </button>
      </nav>
      <section className="hero">
        <div>
          <p className="eyebrow">CREATE YOUR OWN BRANDED SOCIAL NETWORK</p>
          <h1>
            EVERYONE
            <br />
            DESERVES THEIR
            <br />
            <em>OWN WALL.</em>
          </h1>
          <p className="lead">
            For artists, films, brands, companies and communities. Free.
          </p>
          <p className="hero-support">
            Launch a familiar social Wall for your artist, film, brand or
            community—in minutes.
          </p>
          <div className="actions">
            <button className="lime" onClick={() => setWizard(true)}>
              Get Your Wall <ChevronRight size={17} />
            </button>
            <a href="#walls" className="ghost">
              Explore Live Walls
            </a>
          </div>
          <small>
            No developers. No algorithms controlling your reach. No building
            your community on somebody else’s platform.
          </small>
        </div>
        <div className="preview">
          <p className="live-label">● LIVE ARTIST WALL</p>
          <div className="previewbar">
            <b>MAHMOOD KHAN</b>
            <span>● 19k members</span>
            <button>JOIN MY WALL</button>
          </div>
          <div className="previewpost release">
            <Avatar
              p={{
                ...people.official,
                name: "Mahmood Khan",
                initials: "MK",
                color: "#e8bc72",
              }}
            />
            <div>
              <b>
                Mahmood Khan <small>✓</small>
              </b>
              <span>Just now</span>
              <p>
                My new album, <em>After the Silence</em>, is finally yours. I
                wrote it for the spaces between the words.
              </p>
              <div className="mini-art">
                <span>
                  AFTER
                  <br />
                  THE SILENCE
                </span>
                <i>MK</i>
              </div>
              <div className="previewactions">
                <Heart size={16} /> 2,841 <MessageCircle size={16} /> 186{" "}
                <Share2 size={16} /> Share
              </div>
            </div>
          </div>
          <div className="preview-reply">
            <Avatar p={people.aisha} />
            <div>
              <b>Aisha Rahman</b>
              <p>
                Listening now. It already feels like a place I’ve been before.
              </p>
            </div>
          </div>
          <div className="artist-reply">
            <Avatar
              p={{
                ...people.official,
                name: "Mahmood Khan",
                initials: "MK",
                color: "#e8bc72",
              }}
            />
            <p>
              <b>Mahmood Khan</b> Thank you, Aisha. That means more than you
              know. <span>Reply</span>
            </p>
          </div>
          <div className="composer-mini">
            Share something with the Wall… <Plus />
          </div>
        </div>
      </section>
      <section className="inevitable">
        <p>Once every brand needed a website.</p>
        <p>Then they needed a social page.</p>
        <p>
          Now they need their own branded <em>Wall.</em>
        </p>
        <strong>Obviously.</strong>
      </section>
      <section id="walls" className="walls">
        <p className="eyebrow">BUILT FOR BELONGING</p>
        <h2>
          SEE WHAT A WALL
          <br />
          CAN <em>BECOME.</em>
        </h2>
        <div className="wallcards">
          {(Object.keys(wallData) as Theme[]).map((t) => {
            const w = wallData[t];
            return (
              <article className={`wallcard ${t}`} key={t}>
                <div>
                  <p>{w.label}</p>
                  <h3>{w.name.replace(" WALL", "")}</h3>
                  <h4>{w.sub}</h4>
                  <span>{w.desc}</span>
                </div>
                <button onClick={() => go(`#/wall/${t}`)}>
                  Enter the {w.name.replace(" WALL", "")} Wall{" "}
                  <ChevronRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      </section>
      <section className="no-metrics">
        <p className="eyebrow">A DIFFERENT KIND OF SOCIAL SPACE</p>
        <h2>NO METRICS.</h2>
        <p className="no-metrics-copy">
          No display of member counts, likes, reposts, views or any other
          public metrics.
        </p>
        <strong>
          The days of impressing others with fake metrics are gone.
        </strong>
      </section>
      <section id="how" className="how">
        <p className="eyebrow">YOUR SOCIAL LIFE, OWNED</p>
        <h2>LIVE IN MINUTES.</h2>
        <div>
          {[
            ["01", "NAME IT", "Choose a name and Wall address."],
            ["02", "BRAND IT", "Add your logo, colours and identity."],
            [
              "03",
              "INVITE YOUR PEOPLE",
              "Start posting, sharing and building your own social world.",
            ],
          ].map((x) => (
            <article key={x[0]}>
              <b>{x[0]}</b>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="engine">
        <p className="eyebrow">ONE ENGINE. ENDLESS WALLS.</p>
        <div>
          {[
            "Artists",
            "Films",
            "Franchises",
            "Sports",
            "Companies",
            "Products",
            "Schools",
            "Clubs",
            "Events",
            "Private communities",
          ].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <h2>
          You created the world.
          <br />
          <em>Now own the place</em> where its audience lives.
        </h2>
      </section>
      <footer>
        <a className="wordmark" href="#/">
          GET <i /> YOUR WALL
        </a>
        <span>Your brand. Your people. Your Wall.</span>
        <small>
          Concept demonstration. Brand names are used only to demonstrate the
          product idea.
        </small>
      </footer>
      {wizard && <Wizard close={() => setWizard(false)} />}
    </main>
  );
}

function WallPage({ theme, go }: { theme: Theme; go: (s: string) => void }) {
  const wall = wallData[theme] || wallData.trek;
  const key = `gyw-${theme}`;
  const [joined, setJoined] = useState(
    () => localStorage.getItem(key) === "yes",
  );
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(`${key}-posts`) || "null") || wall.posts
      );
    } catch {
      return wall.posts;
    }
  });
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [profile, setProfile] = useState<Person | null>(null);
  const [share, setShare] = useState(false);
  const [wizard, setWizard] = useState(false);
  const notice = (x: string) => {
    setToast(x);
    setTimeout(() => setToast(""), 2500);
  };
  const join = () => {
    setJoined(true);
    localStorage.setItem(key, "yes");
    notice("You joined this Wall");
  };
  const publish = () => {
    if (!text.trim()) return;
    const p: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        initials: "YO",
        bio: "A new member of this Wall.",
        location: "",
        color: "#fff",
      },
      time: "Just now",
      text,
      likes: 0,
      comments: [],
    };
    const n = [p, ...posts];
    setPosts(n);
    localStorage.setItem(`${key}-posts`, JSON.stringify(n));
    setText("");
    notice("Your post is live");
  };
  return (
    <main className={`wall ${theme}`}>
      <header className="walltop">
        <button className="mobilemenu">
          <Menu />
        </button>
        <a onClick={() => go("#/")} className="brandlink">
          GET <i /> YOUR WALL
        </a>
        <b>{wall.name}</b>
        <nav>
          <a>Home</a>
          <a>Members</a>
          <button onClick={() => setDrawer(true)} aria-label="Notifications">
            <Bell />
            <sup>3</sup>
          </button>
          <button aria-label="Search">
            <Search />
          </button>
          <Avatar
            p={{
              ...people.official,
              name: "You",
              initials: "YO",
              color: "#fff",
            }}
          />
        </nav>
        <button className={`join ${joined ? "joined" : ""}`} onClick={join}>
          {joined ? (
            <>
              <Check size={16} /> Joined
            </>
          ) : (
            "JOIN MY WALL"
          )}
        </button>
      </header>
      <div className="wallhero">
        <p>{wall.label}</p>
        <h1>{wall.name}</h1>
        <span>{wall.sub}</span>
      </div>
      <div className="wallnav">
        <a>Wall</a>
        <a>About</a>
        <a>Members</a>
        <a>Media</a>
        <a>Popular posts</a>
      </div>
      <div className="wallgrid">
        <aside className="leftside">
          <h3>{wall.name}</h3>
          <p>{wall.desc}</p>
          <b>✓ OFFICIAL WALL</b>
          <strong>
            {(wall.count + (joined ? 1 : 0)).toLocaleString()} members
          </strong>
          <hr />
          <a>About</a>
          <a>Members</a>
          <a>Media</a>
          <a>Invite people</a>
        </aside>
        <section className="feed">
          <div className="composer">
            <Avatar
              p={{
                ...people.official,
                name: "You",
                initials: "YO",
                color: "#fff",
              }}
            />
            <textarea
              disabled={!joined}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                joined
                  ? "Share something with the Wall…"
                  : "Join this Wall to share something…"
              }
            />
            <div>
              <button>
                <Image /> Photo
              </button>
              <button>
                <Video /> Video
              </button>
              <button>
                <Link /> Link
              </button>
              <button
                className="postbtn"
                disabled={!joined || !text.trim()}
                onClick={publish}
              >
                Post
              </button>
            </div>
          </div>
          {posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onProfile={setProfile}
              onUpdate={(x) => {
                setPosts(posts.map((a) => (a.id === x.id ? x : a)));
                localStorage.setItem(
                  `${key}-posts`,
                  JSON.stringify(posts.map((a) => (a.id === x.id ? x : a))),
                );
              }}
              share={() => setShare(true)}
              notice={notice}
            />
          ))}
        </section>
        <aside className="rightside">
          <section>
            <p className="eyebrow">ABOUT THIS WALL</p>
            <h3>{wall.sub}</h3>
            <span>{wall.desc}</span>
          </section>
          <section>
            <p className="eyebrow">ONLINE NOW</p>
            <div className="online">
              {Object.values(people)
                .slice(1, 5)
                .map((p) => (
                  <Avatar key={p.name} p={p} onClick={() => setProfile(p)} />
                ))}
            </div>
            <b>214 members online</b>
          </section>
          <section className="promo">
            <p>Want a Wall like this?</p>
            <h3>Your brand. Your people. Your Wall.</h3>
            <button onClick={() => setWizard(true)}>
              Get Your Wall <ChevronRight size={15} />
            </button>
          </section>
        </aside>
      </div>
      {toast && <div className="toast">✓ {toast}</div>}
      {drawer && <Notifications close={() => setDrawer(false)} />}{" "}
      {profile && <Profile p={profile} close={() => setProfile(null)} />}{" "}
      {share && <Share close={() => setShare(false)} notice={notice} />}{" "}
      {wizard && <Wizard close={() => setWizard(false)} />}
    </main>
  );
}

function PostCard({
  post,
  onProfile,
  onUpdate,
  share,
  notice,
}: {
  post: Post;
  onProfile: (p: Person) => void;
  onUpdate: (p: Post) => void;
  share: () => void;
  notice: (x: string) => void;
}) {
  const [comments, setComments] = useState(false);
  const [reply, setReply] = useState("");
  const add = () => {
    if (!reply.trim()) return;
    onUpdate({
      ...post,
      comments: [
        ...post.comments,
        {
          id: Date.now().toString(),
          author: {
            ...people.official,
            name: "You",
            initials: "YO",
            color: "#fff",
          },
          text: reply,
          likes: 0,
        },
      ],
    });
    setReply("");
  };
  return (
    <article className="post">
      <div className="posthead">
        <Avatar p={post.author} onClick={() => onProfile(post.author)} />
        <div>
          <button onClick={() => onProfile(post.author)}>
            {post.author.name}
          </button>
          <span>{post.time} · Public</span>
        </div>
        <button
          className="more"
          onClick={() => notice("Post options: saved to your collection")}
        >
          <MoreHorizontal />
        </button>
      </div>
      <p className="posttext">{post.text}</p>
      {post.visual && (
        <div
          className={`visual ${post.visual}`}
          aria-label="Abstract visual placeholder"
        />
      )}
      {post.poll && (
        <div className="poll">
          <button onClick={() => notice("Vote recorded")}>
            Release the original demo <b>62%</b>
          </button>
          <button onClick={() => notice("Vote recorded")}>
            Finish the full version <b>38%</b>
          </button>
        </div>
      )}
      {post.audio && (
        <div className="audio">
          <button>▶</button>
          <span>
            <b>Tonight’s session / piano study</b>
            <i>
              <em />
            </i>
          </span>
          <small>2:48</small>
        </div>
      )}
      <div className="stats">
        <span>{post.likes.toLocaleString()} reactions</span>
        <button onClick={() => setComments(!comments)}>
          {post.comments.length} comments
        </button>
      </div>
      <div className="postactions">
        <button
          className={post.liked ? "active" : ""}
          onClick={() =>
            onUpdate({
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            })
          }
        >
          <Heart /> Like
        </button>
        <button onClick={() => setComments(!comments)}>
          <MessageCircle /> Comment
        </button>
        <button onClick={share}>
          <Share2 /> Share
        </button>
      </div>
      {comments && (
        <div className="comments">
          {post.comments.map((c) => (
            <div className="comment" key={c.id}>
              <Avatar p={c.author} onClick={() => onProfile(c.author)} />
              <div>
                <b>{c.author.name}</b>
                <p>{c.text}</p>
                <button>Like · {c.likes || ""}</button>
                <button>Reply</button>
              </div>
            </div>
          ))}
          <div className="commentbox">
            <Avatar
              p={{
                ...people.official,
                name: "You",
                initials: "YO",
                color: "#fff",
              }}
            />
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="Write a comment…"
            />
            <button onClick={add}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
function Notifications({ close }: { close: () => void }) {
  return (
    <div className="overlay">
      <aside className="drawer">
        <button className="close" onClick={close}>
          <X />
        </button>
        <h2>Notifications</h2>
        {[
          "Maya liked your post",
          "Daniel replied to your comment",
          "The Wall posted a new update",
          "Your welcome badge is ready",
        ].map((x, i) => (
          <div className="notification" key={x}>
            <span>{i < 2 ? "♥" : "✦"}</span>
            <p>
              {x}
              <small>{i + 1}h ago</small>
            </p>
          </div>
        ))}
      </aside>
    </div>
  );
}
function Profile({ p, close }: { p: Person; close: () => void }) {
  const [follow, setFollow] = useState(false);
  return (
    <div className="overlay">
      <section className="modal profile">
        <button className="close" onClick={close}>
          <X />
        </button>
        <Avatar p={p} />
        <h2>{p.name}</h2>
        <p>{p.bio}</p>
        <span>{p.location} · Joined May 2024</span>
        <div>
          <b>
            1.4k
            <br />
            <small>Followers</small>
          </b>
          <b>
            84
            <br />
            <small>Posts</small>
          </b>
        </div>
        <button className="follow" onClick={() => setFollow(!follow)}>
          {follow ? "Following" : "Follow"}
        </button>
      </section>
    </div>
  );
}
function Share({
  close,
  notice,
}: {
  close: () => void;
  notice: (x: string) => void;
}) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
    } catch {}
    close();
    notice("Wall link copied");
  };
  return (
    <div className="overlay">
      <section className="modal share">
        <button className="close" onClick={close}>
          <X />
        </button>
        <h2>Share this post</h2>
        {[
          "Copy Link",
          "Share to Facebook",
          "Share to LinkedIn",
          "Share to X",
          "Send privately",
        ].map((x, i) => (
          <button
            key={x}
            onClick={i === 0 ? copy : () => notice(`${x} is ready to share`)}
          >
            {i === 0 ? <Copy /> : <Share2 />}
            {x}
          </button>
        ))}
      </section>
    </div>
  );
}
function Wizard({ close }: { close: () => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("My Wall");
  const [accent, setAccent] = useState("#b8ff3d");
  return (
    <div className="overlay">
      <section className="modal wizard">
        <button className="close" onClick={close}>
          <X />
        </button>
        <p className="eyebrow">CREATE YOUR WALL · {step}/4</p>
        {step === 1 && (
          <>
            <h2>Who is this Wall for?</h2>
            <div className="choices">
              {["Artist", "Film or Franchise", "Brand", "Community"].map(
                (x) => (
                  <button key={x} onClick={() => setStep(2)}>
                    {x}
                    <ChevronRight />
                  </button>
                ),
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Give your world a name.</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Wall name"
            />
            <textarea placeholder="A short description" />
            <input placeholder="your-wall" />
            <button className="wide" onClick={() => setStep(3)}>
              Continue
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <h2>Make it unmistakably yours.</h2>
            <label>
              Accent colour{" "}
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
              />
            </label>
            <div className="choices">
              <button>Dark edition</button>
              <button>Light edition</button>
              <button>Editorial</button>
            </div>
            <button className="wide" onClick={() => setStep(4)}>
              See live preview
            </button>
          </>
        )}
        {step === 4 && (
          <>
            <div
              className="livepreview"
              style={{ "--accent": accent } as CSSProperties}
            >
              <p>YOUR WALL</p>
              <h2>{name || "My Wall"}</h2>
              <span>Your people have a place to belong.</span>
              <div>Share something with your Wall…</div>
            </div>
            <button className="wide" onClick={() => setStep(5)}>
              Create My Wall
            </button>
          </>
        )}
        {step === 5 && (
          <div className="success">
            <b>✓</b>
            <h2>YOUR WALL IS READY.</h2>
            <p>Your branded social home is ready to invite people in.</p>
            <button className="wide" onClick={close}>
              View My Wall
            </button>
            <button className="textbtn">Invite People</button>
            <button className="textbtn">Copy Wall Link</button>
          </div>
        )}
      </section>
    </div>
  );
}
export default App;
