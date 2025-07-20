import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import type { KeyboardEvent } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import type { Chapter } from '../../types/interfaces'


const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label className="space-y-1 w-full py-2 ">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        {children}
    </label>
)

const useEsc = (handler: () => void) => {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handler()
        }
        window.addEventListener('keydown', onKey as any)
        return () => window.removeEventListener('keydown', onKey as any)
    }, [handler])
}


const AddCourse = () => {
    const { backendUrl, getToken } = useContext(AppContext)

    const quillRef = useRef<Quill | null>(null);
    const editorRef = useRef<HTMLDivElement>(null)

    const [courseTitle, setCourseTitle] = useState('')
    const [coursePrice, setCoursePrice] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [image, setImage] = useState<File | null>(null)

    const [chapters, setChapters] = useState<Chapter[]>([])
    const [showModal, setShowModal] = useState(false)
    const [currentChapterId, setCurrentChapterId] = useState<string | null>(null)

    const [lectureDetails, setLectureDetails] = useState({
        lectureTitle: '',
        lectureDuration: '',
        lectureUrl: '',
        isPreviewFree: false,
    })

    const addChapter = () =>
        setChapters((prev) => [
            ...prev,
            {
                chapterId: uniqid(),
                chapterTitle: '',
                chapterContent: [],
                collapsed: false,
                chapterOrder: prev.length ? prev.slice(-1)[0].chapterOrder + 1 : 1,
                isEditing: true,
            },
        ])

    const removeChapter = (chapterId: string) =>
        setChapters((prev) => prev.filter((c) => c.chapterId !== chapterId))

    const toggleCollapse = (chapterId: string) =>
        setChapters((prev) =>
            prev.map((c) =>
                c.chapterId === chapterId ? { ...c, collapsed: !c.collapsed } : c,
            ),
        )

    const openModal = (chapterId: string) => {
        setCurrentChapterId(chapterId)
        setShowModal(true)
    }

    const addLecture = () => {
        setChapters((prev: any) =>
            prev.map((chapter: Chapter) =>
                chapter.chapterId === currentChapterId
                    ? {
                        ...chapter,
                        chapterContent: [
                            ...chapter.chapterContent,
                            {
                                ...lectureDetails,
                                lectureOrder: chapter.chapterContent.length
                                    ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                                    : 1,
                                lectureId: uniqid(),
                            },
                        ],
                    }
                    : chapter,
            ),
        )
        setLectureDetails({
            lectureTitle: '',
            lectureDuration: '',
            lectureUrl: '',
            isPreviewFree: false,
        })
        setShowModal(false)
    }

    const removeLecture = (chapterId: string, idx: number) =>
        setChapters((prev) =>
            prev.map((c) =>
                c.chapterId === chapterId
                    ? { ...c, chapterContent: c.chapterContent.filter((_, i) => i !== idx) }
                    : c,
            ),
        )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!image) return toast.error('Please select a thumbnail.')

        try {
            const courseData = {
                courseTitle,
                courseDescription: quillRef.current!.root.innerHTML,
                coursePrice: Number(coursePrice),
                discount: Number(discount),
                courseContent: chapters,
            }

            const fd = new FormData()
            fd.append('courseData', JSON.stringify(courseData))
            fd.append('image', image)

            const token = await getToken()
            const { data } = await axios.post(
                backendUrl + '/api/educator/add-course',
                fd,
                { headers: { Authorization: `Bearer ${token}` } },
            )

            if (data.success) {
                toast.success(data.message)
                setCourseTitle('')
                setCoursePrice(0)
                setDiscount(0)
                setImage(null)
                setChapters([])
                quillRef.current!.root.innerHTML = ''
            } else toast.error(data.message)
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    useEsc(() => setShowModal(false))

    return (

        <div className='min-h-screen overflow-y-auto h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
            <div className='w-full'>
                <h2 className="pb-4 text-xl font-semibold text-gray-800">Add Course</h2>
                <div className='w-full overflow-x-auto'>
                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto flex min=w-full flex-col gap-6 text-gray-700"
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField label="Course Title">
                                <input
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                    required
                                    placeholder="e.g. Mastering React"
                                    className="input-base"
                                />
                            </FormField>

                            <FormField label="Course Price">
                                <input
                                    type="number"
                                    value={coursePrice}
                                    onChange={(e) => setCoursePrice(+e.target.value)}
                                    required
                                    min={0}
                                    className="input-base"
                                />
                            </FormField>

                            <FormField label="Discount %">
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={discount}
                                    onChange={(e) => setDiscount(+e.target.value)}
                                    className="input-base"
                                />
                            </FormField>

                            <FormField label="Course Thumbnail">
                                <div
                                    className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-400 p-4 my-2 text-center hover:bg-gray-100"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        const file = e.dataTransfer.files[0]
                                        if (file) setImage(file)
                                    }}
                                >
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                                    />
                                    {image ? (
                                        <img
                                            alt="thumbnail preview"
                                            src={URL.createObjectURL(image)}
                                            className="h-24 w-auto rounded-lg object-cover"
                                        />
                                    ) : (
                                        <p className="flex flex-col items-center gap-2 text-sm">
                                            <img src={assets.file_upload_icon} className="h-10 w-10" />
                                            Drag & drop or click to upload
                                        </p>
                                    )}
                                </div>
                            </FormField>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='my-2'>Course Description</p>
                            <div ref={editorRef} className="min-h-[8rem] rounded-md  bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200"></div>
                        </div>


                        <div className="space-y-4">
                            {chapters.map((chapter, cIdx) => (
                                <article
                                    key={chapter.chapterId}
                                    className="rounded-xl border bg-white shadow-sm transition-shadow hover:shadow"
                                >
                                    <header className="flex items-center justify-between gap-4 p-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => toggleCollapse(chapter.chapterId)}
                                            >
                                                <img
                                                    src={assets.dropdown_icon}
                                                    className={`h-4 transition-transform ${chapter.collapsed ? '-rotate-90' : ''
                                                        }`}
                                                />
                                            </button>
                                            {chapter.isEditing ? (
                                                <input
                                                    autoFocus
                                                    placeholder="Chapter title"
                                                    className="border-b px-1 input-base"
                                                    onBlur={(e) =>
                                                        setChapters((prev) =>
                                                            prev.map((c) =>
                                                                c.chapterId === chapter.chapterId
                                                                    ? {
                                                                        ...c,
                                                                        chapterTitle: e.target.value,
                                                                        isEditing: false,
                                                                    }
                                                                    : c,
                                                            ),
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <h3 className="font-semibold">
                                                    {cIdx + 1}. {chapter.chapterTitle || 'Untitled'}
                                                </h3>
                                            )}
                                        </div>

                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                                            {chapter.chapterContent.length} Lectures
                                        </span>

                                        <button type="button" onClick={() => removeChapter(chapter.chapterId)}>
                                            <img src={assets.cross_icon} className="h-4" />
                                        </button>
                                    </header>

                                    {!chapter.collapsed && (
                                        <div className="space-y-2 p-4">
                                            {chapter.chapterContent.map((lec, lIdx) => (
                                                <div
                                                    key={lec.lectureId}
                                                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
                                                >
                                                    <p className="truncate">
                                                        {lIdx + 1}. {lec.lectureTitle} • {lec.lectureDuration} min{' '}
                                                        •{' '}
                                                        <a
                                                            href={lec.lectureUrl}
                                                            target="_blank"
                                                            className="text-blue-600 underline"
                                                        >
                                                            link
                                                        </a>{' '}
                                                        {lec.isPreviewFree && (
                                                            <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                                                Free preview
                                                            </span>
                                                        )}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeLecture(chapter.chapterId, lIdx)}
                                                    >
                                                        <img src={assets.cross_icon} className="h-3.5" />
                                                    </button>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => openModal(chapter.chapterId)}
                                                className="mt-2 inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100"
                                            >
                                                + Add Lecture
                                            </button>
                                        </div>
                                    )}
                                </article>
                            ))}

                            <button
                                type="button"
                                onClick={addChapter}
                                className="rounded-lg bg-gray-200 py-2 text-center font-medium hover:bg-gray-300 px-2 cursor-pointer"
                            >
                                + Add Chapter
                            </button>
                        </div>

                        {/* submit */}
                        <button
                            type="submit"
                            className="self-start rounded-lg bg-blue-600 px-8 py-2.5 text-white transition hover:brightness-110"
                        >
                            Add Course
                        </button>
                    </form>
                    {showModal && (
                        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
                            <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
                                <h2 className="mb-4 text-lg font-semibold">Add Lecture</h2>
                                <FormField label="Lecture Title">
                                    <input
                                        value={lectureDetails.lectureTitle}
                                        onChange={(e) =>
                                            setLectureDetails((s) => ({
                                                ...s,
                                                lectureTitle: e.target.value,
                                            }))
                                        }
                                        className="input-base"
                                    />
                                </FormField>
                                <FormField label="Duration (minutes)">
                                    <input
                                        type="number"
                                        value={lectureDetails.lectureDuration}
                                        onChange={(e) =>
                                            setLectureDetails((s) => ({
                                                ...s,
                                                lectureDuration: e.target.value,
                                            }))
                                        }
                                        className="input-base"
                                    />
                                </FormField>
                                <FormField label="Lecture URL">
                                    <input
                                        value={lectureDetails.lectureUrl}
                                        onChange={(e) =>
                                            setLectureDetails((s) => ({
                                                ...s,
                                                lectureUrl: e.target.value,
                                            }))
                                        }
                                        className="input-base"
                                    />
                                </FormField>

                                <label className="mt-4 flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={lectureDetails.isPreviewFree}
                                        onChange={(e) =>
                                            setLectureDetails((s) => ({
                                                ...s,
                                                isPreviewFree: e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    Free preview
                                </label>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={addLecture}
                                        className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 rounded-lg border py-2 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute right-4 top-4"
                                >
                                    <img src={assets.cross_icon} className="h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddCourse

