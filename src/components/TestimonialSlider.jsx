"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiStar, FiUser } from 'react-icons/fi';

const testimonials = [
  {
    name: "Oluwaseun Adebayo",
    role: "Freelance Designer",
    content: "Worknub has completely transformed how I work. The environment is incredibly productive and the community is amazing.",
    rating: 5,
  },
  {
    name: "Chiamaka Nwachukwu",
    role: "Startup Founder",
    content: "The flexibility and professional atmosphere at Worknub is unmatched. Best coworking space in Ibadan!",
    rating: 5,
  },
  {
    name: "Michael Ogunleye",
    role: "Remote Developer",
    content: "Reliable internet, constant power, and great networking opportunities. Highly recommended!",
    rating: 5,
  },
];

export default function TestimonialSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="testimonial-swiper"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FiStar key={i} className="text-worknub-orange fill-worknub-orange" />
              ))}
            </div>
            <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-worknub-mint rounded-full flex items-center justify-center">
                <FiUser className="text-worknub-green text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-worknub-dark">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}